import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Link,
} from "@carbon/react";

interface ListProps {
  headers?: { key: string; header: string }[];
  items?: { id: number; title: string; skillLevel: string }[];
}

const List: React.FC<ListProps> = ({ headers, items }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers?.map((col) => (
            <TableHeader key={col.key}>{col.header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {items?.map((item) => (
          <TableRow key={item.id}>
            <td>{item.title}</td>
            <td>{item.skillLevel}</td>
            <td>
              <Link>Remove</Link>
            </td>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default List;
