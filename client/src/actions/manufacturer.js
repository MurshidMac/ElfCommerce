export const FETCH_MANUFACTURERS = 'FETCH_MANUFACTURERS';
export const FETCH_MANUFACTURERS_SUCCESS = 'FETCH_MANUFACTURERS_SUCCESS';
export const FETCH_MANUFACTURERS_FAILED = 'FETCH_MANUFACTURERS_FAILED';

export const FETCH_MANUFACTURER_DETAILS = 'FETCH_MANUFACTURE_DETAILS';
export const FETCH_MANUFACTURER_DETAILS_SUCCESS =
  'FETCH_MANUFACTURE_DETAILS_SUCCESS';
export const FETCH_MANUFACTURER_DETAILS_FAILED =
  'FETCH_MANUFACTURE_DETAILS_FAILED';

export function fetchManufacturers(data) {
  return { type: FETCH_MANUFACTURERS, value: data };
}

export function fetchManufacturersSuccess(data) {
  return { type: FETCH_MANUFACTURERS_SUCCESS, value: data };
}

export function fetchManufacturersFailed() {
  return { type: FETCH_MANUFACTURERS_FAILED };
}

export function fetchManufacturerDetails() {
  return { type: FETCH_MANUFACTURER_DETAILS };
}

export function fetchManufacturerDetailsSuccess(data) {
  return { type: FETCH_MANUFACTURER_DETAILS_SUCCESS, value: data };
}

export function fetchManufacturerDetailsFailed() {
  return { type: FETCH_MANUFACTURER_DETAILS_FAILED };
}
