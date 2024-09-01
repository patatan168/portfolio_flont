/**	ex) 2024/08/16 19:32 */
const formatterOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

/** 無効な日付 */
const invalidDate: string = '---/--/-- --:--';

/**
 * フォーマット済みの日付を作成
 * @param date 日付
 */
export function createFormatedDate(date: string | number): string {
  const tmpDate = new Date(date);
  if (tmpDate.getTime() === 0 || isNaN(tmpDate.getTime())) {
    return invalidDate;
  } else {
    return tmpDate.toLocaleString('ja-JP', formatterOptions);
  }
}
