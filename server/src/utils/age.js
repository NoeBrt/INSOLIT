/**
 * Calculate the age from a date of birth string.
 * Returns the age in years.
 */
export function calculateAge(dateOfBirth) {
  const today = new Date()
  const birth = new Date(dateOfBirth)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

/**
 * Check if a user is under 26 years old.
 */
export function isUnder26(dateOfBirth) {
  return calculateAge(dateOfBirth) < 26
}
