import Vue from 'vue'
import * as axios from 'axios'


export default axios.create({
  baseURL: 'http://118.31.189.23:8060'
});
