import React, { useState } from "react";

import useTable from "../../../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({
    data,
    rowsPerPage,
    onEditClick,
    onDetailClick,
    onDeleteClick,
    visibility,
    EditVisibility,
    parcelInGroup,
    onChangeHandler,
}) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const editHandlerOnClick = (id) => {
        onEditClick(id);
    };

    const detailHandlerOnClick = (id) => {
        onDetailClick(id);
    };

    const deleteHandlerOnClick = (id) => {
        onDeleteClick(id);
    };

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>Include to group</th>
                        <th className={styles.tableHeader}>Parcel ID</th>
                        {/* <th className={styles.tableHeader}>Sender ID</th> */}
                        {/* <th className={styles.tableHeader}>Receiver ID</th> */}
                        <th className={styles.tableHeader}>Type of Shipment</th>
                        <th className={styles.tableHeader}>Weight</th>
                        <th className={styles.tableHeader}>
                            Receiver Postcode
                        </th>
                        <th className={styles.tableHeader}>Income Date</th>
                        <th className={`${styles.tableHeader} text-center `}>
                            Function
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el._id}>
                            <td className={styles.tableCell}>
                                <input
                                    type="checkbox"
                                    name={el._id}
                                    onChange={onChangeHandler}
                                />
                            </td>
                            <td className={styles.tableCell}>{el._id}</td>
                            <td className={styles.tableCell}>
                                {el.typeofshipment}
                            </td>
                            <td className={styles.tableCell}>{el.weight}</td>
                            <td className={styles.tableCell}>
                                {el.receiver.postcode}
                            </td>
                            <td className={styles.tableCell}>
                                {
                                    new Date(el.createdAt)
                                        .toISOString()
                                        .split("T")[0]
                                }
                            </td>
                            <td className={styles.tableCell}>
                                <div>
                                    <button
                                        className={
                                            visibility || EditVisibility
                                                ? `text-slate-600 pointer-events-none transition`
                                                : `text-blue-600 hover:text-slate-300 transition`
                                        }
                                        onClick={() =>
                                            detailHandlerOnClick(el._id)
                                        }
                                    >
                                        Detail
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter
                range={range}
                slice={slice}
                setPage={setPage}
                page={page}
            />
            {/* {parcelInGroup.map((each) => {
                return <p key={each}>{each}</p>;
            })} */}
        </>
    );
};

export default Table;
