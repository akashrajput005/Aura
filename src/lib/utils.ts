import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const formatDateTime = (dateString: Date | string | number) => {
  const date = dateString ? new Date(dateString) : new Date();

  // Check for invalid date
  if (isNaN(date.getTime())) {
    return {
      dateTime: 'N/A',
      dateOnly: 'N/A',
      timeOnly: 'N/A',
    }
  }

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const formattedDateTime: string = date.toLocaleString('en-US', dateTimeOptions)
  const formattedDate: string = date.toLocaleString('en-US', dateOptions)
  const formattedTime: string = date.toLocaleString('en-US', timeOptions)

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export const formatPrice = (price: string, currency: string = 'INR') => {
  const amount = parseFloat(price) || 0
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)

  return formatted
}

export function formUrlQuery({ params, key, value }: { params: string, key: string, value: string | null }) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: { params: string, keysToRemove: string[] }) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}
