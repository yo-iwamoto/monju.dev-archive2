import $api from '@/api/api/$api';
import axios from 'axios';
import aspidaAxios from '@aspida/axios';

export const api = $api(aspidaAxios(axios));
