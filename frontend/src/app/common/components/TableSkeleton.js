import Skeleton from "react-loading-skeleton"

const TableSkeleton = ({className, row = 10, col = 4, height = 50}) => {

    return     <div className={`table-wrapper my-5 ${className}`}>
                    <table
                        className="custom-table"
                    >
                        <thead>
                            {
                                [...Array(row)].map((_, i) => <tr key={i}>
                                    {
                                        [...Array(col)].map((_, j) => <td 
                                                                            className={`py-3`} key={j}
                                                                        >
                                                                            <Skeleton height={height} />
                                                                        </td>)
                                    }                                    

                            </tr>)
                            }
                        </thead>
                    </table>
            </div>
}

export default TableSkeleton;