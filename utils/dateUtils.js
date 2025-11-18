// Return difference in days
export const daysBetween = (date1, date2) => {
  const diff = Math.abs(date2 - date1);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

// Passport validity
export const passportStatus = (expiryDate) => {
  const today = new Date();
  const daysLeft = daysBetween(today, expiryDate);

  if (expiryDate < today) return "expired";
  if (daysLeft < 360) return "expiring soon";
  return "valid";
};

// Police clearance
export const policeStatus = (dispatchDate) => {
  const today = new Date();
  const days = daysBetween(today, dispatchDate);

  if (days > 170) return "expired-pcc";
  if (days >= 90 && days <= 169) return "reapply";
  return "valid";
};
