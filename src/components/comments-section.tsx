import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const mockComments = [
  {
    id: 'comment-1',
    name: 'Maya Johnson',
    handle: '@maya',
    timestamp: '2 days ago',
    content:
      'Loved this piece. The pacing is great, and the examples made the ideas feel actionable.',
  },
  {
    id: 'comment-2',
    name: 'Leo Park',
    handle: '@leopark',
    timestamp: '1 day ago',
    content:
      'Appreciate the clarity here. The section on trade-offs resonated with a project I just shipped.',
  },
  {
    id: 'comment-3',
    name: 'Nina Patel',
    handle: '@nina',
    timestamp: '8 hours ago',
    content:
      'Great read. Would love a follow-up that digs deeper into the tooling choices.',
  },
]

export default function CommentsSection() {
  return (
    <section className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <h2 className='text-xl font-semibold'>评论</h2>
        <span className='text-sm text-muted-foreground align-middle'>
          {mockComments.length} 个评论
        </span>
      </div>

      <div className='grid gap-4'>
        <Textarea
          placeholder='搁这评论...'
          className='min-h-30 resize-none text-sm'
        />
        <div className='flex justify-end'>
          <Button type='button'>发表</Button>
        </div>
      </div>

      <div>
        {mockComments.map((comment) => (
          <div key={comment.id} className='py-4 border-b last:border-0'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
              <div className='space-y-2'>
                <div className='flex flex-wrap items-center gap-2 text-sm'>
                  <span className='font-medium'>{comment.name}</span>
                  <span className='text-xs text-muted-foreground'>
                    {comment.handle}
                  </span>
                  <span className='text-xs text-muted-foreground' aria-hidden>
                    •
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    {comment.timestamp}
                  </span>
                </div>
                <p className='text-sm leading-relaxed text-foreground/90'>
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
