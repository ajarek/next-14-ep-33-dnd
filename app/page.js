'use client'
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { useState } from 'react'
import LinearGradient from '../components/LinearGradient'
import {initialValue} from '../data'

function SortableItem({ item }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className='p-2 flex gap-4 w-[250px]'
    >
      <div className='w-full select-none'>
        <h1 className='text-3xl'>{item.title}</h1>
        <p>{item.description}</p>
      </div>
      <div
        {...listeners}
        node={setActivatorNodeRef}
        className='p-1 flex items-center cursor-grab hover:bg-gray-100 rounded'
      >
        <GripVertical className='w-4 h-4' />
      </div>
    </li>
  )
}

export default function Home() {
  const [items, setItems] = useState(initialValue)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (active?.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((item) => item.id === active?.id)
        const overIndex = prev.findIndex((item) => item.id === over?.id)
        return arrayMove(prev, activeIndex, overIndex)
      })
    }
  }

  return (
    <>
      <LinearGradient
        option={1}
        width='100vw'
        height='100vh'
      >
        <div className='rounded shadow-lg bg-white p-4'>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              <ul>
                {items.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
      </LinearGradient>
    </>
  )
}
