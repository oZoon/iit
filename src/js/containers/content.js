import React, { useState } from "react";

import {
    useTable,
    useSortBy,
    usePagination,
    useGlobalFilter,
    useFilters,
    useRowSelect,
} from 'react-table'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)

import PhoneInput from 'react-phone-number-input';
import '../../styles/phone-input.css';

import TaskTable from '../components/table';
import Pagination from '../components/pagination';
import { timestampToDateTime, formatPhone, randomID } from '../lib/utils';

import {
    FILTER_NUMBER_RANGE,
    FILTER_STRING_SINGLE,
    FILTER_DATE_RANGE,
    FILTER_NUMBER_PHONE,
    FILTER_NUMBER_SINGLE,
} from '../lib/constants';

const Content = (props) => {
    const {
        taskList,
    } = props;

    const SecectionRow = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef

            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])
            const id = randomID(12);

            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        lineHeight: '11px',
                    }}
                >
                    <input
                        id={id}
                        className="table-selection-row"
                        type="checkbox"
                        ref={resolvedRef}
                        {...rest}
                    />
                    <label htmlFor={id}></label>
                </div>
            )
        }
    )

    const useColumnFilter = column => {
        const { filterValue = [], preFilteredRows, setFilter, id } = column;
        switch (column.filterType) {
            case FILTER_NUMBER_RANGE:
                const [minNR, maxNR] = React.useMemo(() => {
                    let minNR = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
                    let maxNR = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
                    preFilteredRows.forEach(row => {
                        minNR = Math.min(row.values[id], minNR)
                        maxNR = Math.max(row.values[id], maxNR)
                    })
                    return [minNR, maxNR]
                }, [id, preFilteredRows])
                filterValue[0] = filterValue[0] === undefined ? minNR : filterValue[0];
                filterValue[1] = filterValue[1] === undefined ? maxNR : filterValue[1];
                return (
                    <div className="filter-text-task-number">
                        <input
                            type="number"
                            className="filter-width-70"
                            value={filterValue[0] || ''}
                            onChange={e => {
                                const val = e.target.value
                                setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
                            }}
                        />
                        <span className="task-header-text">до</span>
                        <input
                            type="number"
                            className="filter-width-70"
                            value={filterValue[1] || ''}
                            onChange={e => {
                                const val = e.target.value
                                setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
                            }}
                        />
                    </div>
                )
                break;
            case FILTER_DATE_RANGE:
                const [minDR, maxDR] = React.useMemo(() => {
                    let minDR = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
                    let maxDR = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
                    preFilteredRows.forEach(row => {
                        minDR = Math.min(row.values[id], minDR)
                        maxDR = Math.max(row.values[id], maxDR)
                    })
                    return [minDR, maxDR]
                }, [id, preFilteredRows])
                const [startDate, setStartDate] = useState(minDR);
                const [endDate, setEndDate] = useState(maxDR);
                const CustomInput = React.forwardRef((props, ref) => (
                    <button ref={ref} className="filter-width-90" onClick={props.onClick}>
                        {props.value}
                    </button>
                ))
                return (
                    <div className="filter-text-task-date">
                        <span className="task-header-date">
                            от
                        <DatePicker
                                dateFormat="dd.MM.yyyy"
                                selected={startDate}
                                onChange={date => {
                                    console.log(date);
                                    setFilter((old = []) => [(+ date), old[1]])
                                    setStartDate(date)
                                }}
                                customInput={<CustomInput ref={React.createRef()} />}
                                locale={ru}
                                monthsShown={4}
                            />
                        </span>
                        <span className="task-header-date">
                            до
                        <DatePicker
                                dateFormat="dd.MM.yyyy"
                                selected={endDate}
                                onChange={date => {
                                    setFilter((old = []) => [old[0], (+ date)])
                                    setEndDate(date)
                                }}
                                customInput={<CustomInput ref={React.createRef()} />}
                                locale={ru}
                                showPreviousMonths
                                monthsShown={4}
                            />
                        </span>
                    </div>
                )
            case FILTER_STRING_SINGLE:
                const countString = preFilteredRows.length;
                return (
                    <div className="filter-text-task-number">
                        <input
                            type="text"
                            className="filter-width-150"
                            value={filterValue || ''}
                            onChange={e => {
                                setFilter(e.target.value || undefined)
                            }}
                        />
                    </div>
                )
                break;
            case FILTER_NUMBER_SINGLE:
                const countNumber = preFilteredRows.length;
                return (
                    <div className="filter-text-task-number">
                        <input
                            type="number"
                            className="filter-width-70"
                            value={filterValue || ''}
                            onChange={e => {
                                setFilter(e.target.value || undefined)
                            }}
                        />
                    </div>
                )
                break;
            case FILTER_NUMBER_PHONE:
                const [valuePhone, setValuePhone] = useState();
                return (
                    <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="RU"
                        value={valuePhone ? valuePhone : ''}
                        onChange={value => {
                            setValuePhone(value)
                            setFilter(value)
                        }}
                    />
                )
                break;
        }
    }

    const data = React.useMemo(() => taskList.data, []);
    const columns = React.useMemo(() => [
        {
            Header: 'Номер заявки',
            accessor: 'taskNumber',
            disableFilters: false,
            disableSortBy: false,
            filterType: FILTER_NUMBER_RANGE,
            filter: 'between',
            css: 'task-number',
        },
        {
            Header: 'Дата заявки',
            accessor: 'taskDate',
            disableFilters: false,
            disableSortBy: false,
            filterType: FILTER_DATE_RANGE,
            Cell: ({ value }) => timestampToDateTime(value),
            filter: 'between',
            css: 'task-date',
        },
        {
            Header: 'Клиент',
            accessor: 'customerFull',
            disableFilters: false,
            disableSortBy: false,
            filterType: FILTER_STRING_SINGLE,
            sortType: (a, b) => {
                const a1 = a.values['customerFull'].split('"')[1];
                const b1 = b.values['customerFull'].split('"')[1];
                return a1.localeCompare(b1);
            },
            css: 'customer-full',
        },
        {
            Header: 'Перевозчик',
            accessor: 'supplierFull',
            disableFilters: false,
            disableSortBy: false,
            filterType: FILTER_STRING_SINGLE,
            sortType: (a, b) => {
                const a1 = a.values['supplierFull'].split('"')[1];
                const b1 = b.values['supplierFull'].split('"')[1];
                return a1.localeCompare(b1);
            },
            css: 'supplier-full',
        },
        {
            Header: 'Контакты перевозчика',
            accessor: 'supplierPhone',
            disableFilters: false,
            disableSortBy: false,
            filterType: FILTER_NUMBER_PHONE,
            Cell: ({ value }) => formatPhone(value),
            css: 'customer-phone',
        },
        {
            Header: 'Комментарии',
            accessor: 'comments',
            disableFilters: true,
            disableSortBy: true,
            filterType: FILTER_STRING_SINGLE,
            css: 'comments',
        },
        {
            Header: 'ATI',
            accessor: 'atiCode',
            disableFilters: false,
            disableSortBy: false,
            filterType: FILTER_NUMBER_SINGLE,
            css: 'ati-code',
        },
    ]
        , []);

    const {
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        page,

        state: {
            pageIndex,
            pageSize,
            selectedRowIds,
        },
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,

    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,

        useRowSelect,
    )

    const propsTaskTable = {
        page,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        useColumnFilter,
    }
    const propsPagination = {
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        pageIndex,
        pageSize,
    }

    return (
        <div className="content">
            <div className="content-table">
                <TaskTable {...propsTaskTable} />
                <Pagination {...propsPagination} />
            </div>
        </div>
    )
}

export default Content;
