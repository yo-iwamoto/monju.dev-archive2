import $api from '@/api/api/$api';
import aspida from '@aspida/fetch';

export const api = $api(aspida(fetch));
