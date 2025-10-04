import React, { useEffect, useState } from "react";
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
  const [listItems, setListItems] = useState(items || []);

  const handleRemove = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    e.preventDefault();
    setListItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setListItems(items || []);
  }, [items]);

  return (
    <>
      {(!headers || headers.length === 0) &&
      (!listItems || listItems.length === 0) ? null : (
        <Table>
          <TableHead>
            <TableRow>
              {headers?.map((col) => (
                <TableHeader key={col.key}>{col.header}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems?.map((item, i) => (
              <TableRow key={item.id}>
                <td>{item.title}</td>
                <td>{item.skillLevel}</td>
                <td>
                  <Link
                    data-testId={`remove-link-${i}`}
                    id={`remove-link-${i}`}
                    aria-label={`Remove ${item.title}`}
                    href="#"
                    onClick={(e) => handleRemove(e, item.id)}
                  >
                    Remove
                  </Link>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default List;
