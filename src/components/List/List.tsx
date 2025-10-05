import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Link,
} from "@carbon/react";

export interface SkillItem {
  id: number;
  title: string;
  skillLevel: string;
}

interface ListProps {
  headers?: { key: string; header: string }[];
  items?: SkillItem[];
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
      {!listItems || listItems.length === 0 ? null : (
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
                    data-testid={`remove-link-${i}`}
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
