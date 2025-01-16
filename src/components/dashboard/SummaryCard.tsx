interface SummaryCardProps {
  title: string;
  id: string;
  count: number;
  percentageValue: number;
  dateRange: number;
  isAllowDecimal?: boolean;
}

export function SummaryCard({
  title,
  id,
  count,
  percentageValue,
  dateRange,
  isAllowDecimal = false
}: SummaryCardProps) {
  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {dateRange > 0 && (
          <span className="text-sm text-gray-500">Last {dateRange} Days</span>
        )}
        {dateRange === -1 && (
          <span className="text-sm text-gray-500">All Time</span>
        )}
      </div>
      <div className="text-4xl font-bold text-gray-900">
        {id === 'sales' && '$'}
        {isAllowDecimal ? count.toFixed(2) : count}
      </div>
      {dateRange > 0 && (
        <div className={`mt-2 text-sm ${percentageValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {percentageValue > 0 && '+'}
          {percentageValue.toFixed(1)}% vs previous period
        </div>
      )}
    </div>
  );
} 