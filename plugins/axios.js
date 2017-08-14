import Vue from 'vue'
import * as axios from 'axios'


export default axios.create({
  baseURL: 'http://120.27.196.145:8060'
});
