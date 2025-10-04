export const LeadStages = ['potential','pending_consent','screening','enrolled','screen_fail','not_interested','do_not_contact'];

export const AllowedNext = {
  potential: ['pending_consent','screening','not_interested','do_not_contact'],
  pending_consent: ['screening','not_interested','do_not_contact'],
  screening: ['enrolled','screen_fail','not_interested','do_not_contact'],
  enrolled: [],
  screen_fail: [],
  not_interested: [],
  do_not_contact: []
};

export function canTransition(from, to) {
  return (AllowedNext[from] || []).includes(to);
}
