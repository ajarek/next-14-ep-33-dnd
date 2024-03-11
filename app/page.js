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
import { initialValue } from '../data'
import { SortableItem } from '../components/SortableItem'

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
        <div className='rounded shadow-lg bg-white p-4 '>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              <ul className='flex flex-col gap-2'>
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
