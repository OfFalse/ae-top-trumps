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
  title: string;
  headers?: { key: string; header: string }[];
  items?: SkillItem[];
  setSelectedSkillsList: React.Dispatch<React.SetStateAction<any[]>>;
}

const List: React.FC<ListProps> = ({
  title,
  headers,
  items,
  setSelectedSkillsList,
}) => {
  // Local state to manage list items
  // Syncs with parent component's selected skills
  const [listItems, setListItems] = useState(items || []);

  const handleRemove = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    e.preventDefault();
    // Remove item from parent state
    setSelectedSkillsList((prevSkills) =>
      prevSkills.filter((skill) => skill.id !== id),
    );
  };

  useEffect(() => {
    setListItems(items || []);
  }, [items]);

  return (
    <>
      {!listItems || listItems.length === 0 ? null : (
        <>
          <h3>{title}</h3>
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
        </>
      )}
    </>
  );
};

export default List;
