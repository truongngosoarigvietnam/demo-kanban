import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Item as ItemType } from "../../../data";
import Item from "./Item";

interface ColumnProps {
    columnId: string;
    items: ItemType[];
    handleScroll: (e: React.UIEvent<HTMLDivElement>, columnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ columnId, items, handleScroll }) => {
    return (
        <Droppable droppableId={columnId}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                        width: "300px",
                        height: "700px",
                        overflowY: "auto",
                        border: "1px solid lightgray",
                    }}
                    onScroll={(e) => handleScroll(e, columnId)}
                >
                    {items.map((item, index) => (
                        <Item key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Column;
