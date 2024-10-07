import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Item as ItemType } from "../../../data";

interface ItemProps {
    item: ItemType;
    index: number;
}

const Item: React.FC<ItemProps> = ({ item, index }) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        padding: "20px",
                        margin: "0 0 8px 0",
                        background: "lightblue",
                        ...provided.draggableProps.style,
                    }}
                >
                    {item.content}
                </div>
            )}
        </Draggable>
    );
};

export default Item;
