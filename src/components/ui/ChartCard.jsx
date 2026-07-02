import Card, { CardHeader } from './Card.jsx'
import Skeleton from './Skeleton.jsx'
import EmptyState from './EmptyState.jsx'
import { BarChart3 } from 'lucide-react'

export default function ChartCard({ title, subtitle, action, isLoading, isEmpty, children, height = 280 }) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} action={action} />
      {isLoading ? (
        <Skeleton variant="chart" />
      ) : isEmpty ? (
        <EmptyState icon={BarChart3} title="No data yet" description="Data will appear here once available." />
      ) : (
        <div style={{ width: '100%', height }}>{children}</div>
      )}
    </Card>
  )
}
