"use client";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { initialData, ColumnData } from "../../../data";
import Column from "./Column";

const ITEMS_PER_PAGE = 20;

const KanbanBoard: React.FC = () => {
    const [columns, setColumns] = useState<ColumnData>({
        column1: initialData.column1.slice(0, ITEMS_PER_PAGE),
        column2: initialData.column2.slice(0, ITEMS_PER_PAGE),
        column3: initialData.column3.slice(0, ITEMS_PER_PAGE),
    });

    const [itemCount, setItemCount] = useState<Record<string, number>>({
        column1: ITEMS_PER_PAGE,
        column2: ITEMS_PER_PAGE,
        column3: ITEMS_PER_PAGE,
    });

    const onDragEnd = (result: DropResult): void => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceColumn = Array.from(columns[source.droppableId]);
        const destColumn = Array.from(columns[destination.droppableId]);

        const [removed] = sourceColumn.splice(source.index, 1);
        destColumn.splice(destination.index, 0, removed);

        setColumns((prev) => ({
            ...prev,
            [source.droppableId]: sourceColumn,
            [destination.droppableId]: destColumn,
        }));
    };

    const handleScroll = (
        e: React.UIEvent<HTMLDivElement>,
        columnId: string
    ): void => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight) {
            setTimeout(() => {
                setColumns((prevColumns) => {
                    const newCount = itemCount[columnId] + ITEMS_PER_PAGE;
                    setItemCount((prev) => ({
                        ...prev,
                        [columnId]: newCount,
                    }));

                    return {
                        ...prevColumns,
                        [columnId]: initialData[columnId].slice(0, newCount),
                    };
                });
            }, 500);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-5 h-screen w-screen items-center justify-center">
                <div className="flex gap-5">
                    {Object.keys(columns).map((columnId) => (
                        <Column
                            key={columnId}
                            columnId={columnId}
                            items={columns[columnId]}
                            handleScroll={handleScroll}
                        />
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;
