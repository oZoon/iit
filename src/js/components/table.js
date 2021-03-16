import React from "react";

const TaskTable = (props) => {
    const {
        page,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        useColumnFilter,
    } = props;

    const upBlack = <span key="up-black" style={{ color: 'black' }}>&uarr;</span>
    const upRed = <span key="up-red" style={{ color: 'red' }}>&uarr;</span>
    const downBlack = <span key="down-black" style={{ color: 'black' }}>&darr;</span>
    const downRed = <span key="down-red" style={{ color: 'red' }}>&darr;</span>

    return (
        <table {...getTableProps()} className="table">
            <thead className="table-tr-header">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, i) => (
                            <th
                                key={i + 1}
                                className={`task-item-${column.css}`}
                            >
                                <span className="task-item-header">
                                    <span
                                        className="task-header-text"
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        {column.render('Header')}
                                        {' '}
                                        {!column.disableSortBy ?
                                            (
                                                typeof column.isSortedDesc == 'boolean'
                                                    ?
                                                    (column.isSortedDesc ?
                                                        [downRed, upBlack]
                                                        :
                                                        [downBlack, upRed]
                                                    )
                                                    :
                                                    [downBlack, upBlack]
                                            )
                                            :
                                            null
                                        }


                                    </span>
                                    <span>
                                        {column.canFilter ? useColumnFilter(column) : null}
                                    </span>
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className="table-tbody">
                {page.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} className="table-tr-content">
                            {row.cells.map((cell, i) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className={`task-item-${cell.column.css}`}
                                    >
                                        {
                                            cell.render('Cell')
                                        }
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TaskTable;
