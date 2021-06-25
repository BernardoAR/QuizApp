import axios from 'axios';
export default {
  list: () => {
    return axios.get('http://opentdb.com/api.php?amount=30');
  },
};
