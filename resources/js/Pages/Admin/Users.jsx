import { router } from "@inertiajs/react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("id", {
        header: "ID",
        cell: info => info.getValue(),
    }),

    columnHelper.accessor("name", {
        header: "Név",
        cell: info => info.getValue(),
    }),

    columnHelper.accessor("email", {
        header: "Email",
        cell: info => info.getValue(),
    }),

    columnHelper.accessor("is_approved", {
        header: "Jóváhagyva",
        cell: info => (info.getValue() ? "Igen" : "Nem"),
    }),

    columnHelper.accessor("is_active", {
        header: "Aktív",
        cell: info => (info.getValue() ? "Igen" : "Nem"),
    }),

    columnHelper.accessor("is_admin", {
        header: "Admin",
        cell: info => (info.getValue() ? "Igen" : "Nem"),
    }),

    columnHelper.display({
    id: "actions",
    header: "Műveletek",

    cell: ({ row }) => (
        <>
            <button
                onClick={() =>
                    router.get(`/admin/users/${row.original.id}/details`)
                }
            >
                Adatok megtekintése
            </button>

            {" "}

            {!row.original.is_approved && (
                <button
                    onClick={() =>
                        router.patch(`/admin/users/${row.original.id}/approve`)
                    }
                >
                    Jóváhagyás
                </button>
            )}

            {" "}

            <button
                onClick={() =>
                    router.patch(`/admin/users/${row.original.id}/toggle-active`)
                }
            >
                {row.original.is_active ? "Inaktiválás" : "Aktiválás"}
            </button>
        </>
    ),
}),
];



export default function Users({users}) {
    const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
});
    return(
        <div style={{padding: "20px"}}>
            <h1>Partner lista</h1>
            <table border="1" cellPadding="8" cellSpacing="0">
    <thead>
        {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                              )}
                    </th>
                ))}
            </tr>
        ))}
    </thead>

    <tbody>
        {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
</table>
        </div>
    );
}