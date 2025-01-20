'use client'

interface BottomContainerProps {
  charCount: number
  pageCount: number
  message: string
  isShowCustomAttributeNotification?: boolean
}

export function BottomContainer({
  charCount,
  pageCount,
  message,
  isShowCustomAttributeNotification = false
}: BottomContainerProps) {
  const hasUnicode = /[^\u0000-\u007F]/.test(message)
  const maxChars = hasUnicode ? 181 : 439

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-gray-600">
        <div>Page Count: {pageCount}</div>
        <div>{charCount}/{maxChars}</div>
      </div>

      {isShowCustomAttributeNotification && (
        <p className="italic text-blue-600">
          Modify the blue highlighted fields as desired.
        </p>
      )}

      <p className="italic text-sky-600">
        Your SMS includes a concise 20-character opt-out message.
      </p>

      {charCount > maxChars && (
        <p className="italic text-amber-600">
          Messages over {maxChars} characters more. Keep it brief on charges.
        </p>
      )}
    </div>
  )
} 