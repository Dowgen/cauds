import Vue from 'vue'
import * as axios from 'axios'


export default axios.create({
  baseURL: 'http://192.168.1.158:8060'
});
