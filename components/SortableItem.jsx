import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
export function SortableItem({ item }) {
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
      className='p-2 flex gap-4 min-w-[250px]  border-2 rounded-sm shadow-sm'
    >
      <div className='w-full select-none'>
        <h1 className='text-3xl'>{item.title}</h1>
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