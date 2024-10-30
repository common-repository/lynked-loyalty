import { ApiClient } from '../../utils/api';
import {env} from "../../links/links";

class DataProviderService extends ApiClient {
  shop = `https://${window.location.hostname}/wp-json/lynked/`;
  link = `${env.api}/wordpress/`;


  getPoints = `${this.link}get-points`;
  getRewardCounts = `${this.link}vouchers_count`;
  getShop = `${this.shop}shop-info`;
  createDiscountPath = `${this.shop}discount`;

  async getShopName(nonce) {
    return await this.get(this.getShop, nonce);
  }

  async getPoint(data) {
    return await this.post(this.getPoints, data);
  }

  async getRewardCount(data) {
    return await this.post(this.getRewardCounts, data);
  }

  async createDiscount(data) {
    return await this.post(this.createDiscountPath, data);
  }

}

export default new DataProviderService();
