import NepaliDate from 'nepali-date-converter';

/**
 * Get current Nepali date in the format: YYYY-MM-DD
 */
export const getCurrentNepaliDate = (): string => {
  const nepaliDate = new NepaliDate();
  const year = nepaliDate.getYear();
  const month = nepaliDate.getMonth() + 1; // Month is 0-indexed
  const day = nepaliDate.getDate();
  
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

/**
 * Get current Nepali date in Nepali format: YYYY साल MM महिना DD गते
 */
export const getCurrentNepaliDateFormatted = (): string => {
  const nepaliDate = new NepaliDate();
  const year = nepaliDate.getYear();
  const month = nepaliDate.getMonth() + 1; // Month is 0-indexed
  const day = nepaliDate.getDate();
  
  const nepaliMonths = [
    'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'असोज', 
    'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत्र'
  ];
  
  return `${year} साल ${nepaliMonths[month - 1]} ${day} गते`;
};

/**
 * Convert English date to Nepali date
 * @param englishDate - Date in YYYY-MM-DD format
 */
export const convertToNepaliDate = (englishDate: string): string => {
  const [year, month, day] = englishDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const nepaliDate = new NepaliDate(date);
  
  const nepYear = nepaliDate.getYear();
  const nepMonth = nepaliDate.getMonth() + 1;
  const nepDay = nepaliDate.getDate();
  
  return `${nepYear}-${nepMonth.toString().padStart(2, '0')}-${nepDay.toString().padStart(2, '0')}`;
};

/**
 * Convert English date to formatted Nepali date
 * @param englishDate - Date in YYYY-MM-DD format
 */
export const convertToFormattedNepaliDate = (englishDate: string): string => {
  const [year, month, day] = englishDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const nepaliDate = new NepaliDate(date);
  
  const nepYear = nepaliDate.getYear();
  const nepMonth = nepaliDate.getMonth();
  const nepDay = nepaliDate.getDate();
  
  const nepaliMonths = [
    'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'असोज', 
    'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत्र'
  ];
  
  return `${nepYear} साल ${nepaliMonths[nepMonth]} ${nepDay} गते`;
};