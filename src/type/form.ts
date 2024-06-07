type BankInfoT = {
  bank1_account_number: string | null;
  bank1_card_number: string | null;
  bank1_first_name: string | null;
  bank1_iban_number: string | null;
  bank1_last_name: string | null;
  bank1_name: string | null;
};

type CustomerInfoT = {
  customer_address: string | null;
  customer_birth_date: string | null;
  customer_father_name: string | null;
  customer_first_name: string | null;
  customer_last_name: string | null;
  customer_id_number: string | null;
  customer_job_title: string | null;
  customer_national_code: string | null;
  customer_phone_number1: string | null;
  customer_phone_number2: string | null;
  customer_registration_date: string | null;
  customer_state: string | null;
  customer_zip_code: string | null;
};

type GuardianInfoT = {
  guardian1_address: string | null;
  guardian1_first_name: string | null;
  guardian1_last_name: string | null;
  guardian1_national_code: string | null;
  guardian1_phone_number: string | null;
  guardian1_relation: string | null;
  guardian1_zip_code: string | null;
};

type HeirInfoT = {
  heir1_address: string | null;
  heir1_first_name: string | null;
  heir1_last_name: string | null;
  heir1_national_code: string | null;
  heir1_phone_number: string | null;
  heir1_relation: string | null;
  heir1_share_percentage: number | null;
};

type RefererInfoT = {
  referer1_first_name: string | null;
  referer1_last_name: string | null;
  referer1_phone_number: string | null;
  referer1_national_code: string | null;
};

type CustomerFormT = BankInfoT &
CustomerInfoT &
GuardianInfoT &
HeirInfoT &
RefererInfoT;