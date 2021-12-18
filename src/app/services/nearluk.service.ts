import { featurefilters } from './../model/featurefilters';
import { EnquiryForm } from './../model/enquiryform';
import { contactus } from './../model/contactus';
import { agent, tenantnotifications, owneraddagent, addagent } from './../model/agent';
import { filters } from './../model/filters';
import { Forgot } from './../model/login';
import { property, propertytype } from './../model/property';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as config from './service_init.json';
import { Login } from '../model/login.js';
import { Payment } from '../model/payment';
import { registration } from '../model/Registration.js';
import { Bidding } from '../model/bidding';
import { forum } from '../model/forum';
import { Profile } from '../../../node_modules/@types/selenium-webdriver/firefox';
import { Router } from '@angular/router';
import { postmap } from '../model/propertymap';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class NearlukService {

  Url = environment.api;
  filterObj: filters;
  userSession: any;
  // Url: string = (<any>config).api;

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  constructor(private http: HttpClient, private router: Router) {
    this.filterObj = new filters();
  }

  /*------------------------------------------- CHAT SERVICE API'S ------------------------------------------------------ */
  userroom: any[] = [];

  private socket = io('http://localhost:3400');
  joinRoom(data) {
    this.socket.emit('join', data);
  }
  checkuseronlineornot(data) {
    this.socket.emit('joincheckuseronlineornot', data);
  }
  joinRoomForNotification(data) {
    this.socket.emit('joinfornotification', data);
  }
  joinRoomForNotificationforchat(data) {
    this.socket.emit('joinfornotificationchat', data);
  }
  newUserJoined() {
    let observable = new Observable<{ user: String, message: String, username: string, user2name: string, room: string }>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  newuserjoinedonlinestatus() {
    let observable = new Observable<{ user: String, message: String, username: string, user2name: string, room: string }>(observer => {
      this.socket.on('new user joined online status', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  checkuserstatus() {
    let observable = new Observable<{ user: String, message: String, username: string }>(observer => {
      this.socket.on('check user status', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  userleftoffline() {
    let observable = new Observable<{ user: String, message: String, username: string }>(observer => {
      this.socket.on('user left offline', (data) => {
        //  console.log(data)
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  newUserJoinedfornotification() {
    let observable = new Observable<{ user: String, message: String, username: string }>(observer => {
      this.socket.on('new user joined for notification', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  leaveRoom(data) {
    this.socket.emit('leave', data);
  }
  leaveRoomforchat(data) {
    this.socket.emit('leaveforchat', data);
  }
  leaveRoomfornotification(data) {
    this.socket.emit('leavefornotification', data);
  }
  userLeftRoom() {
    let observable = new Observable<{ user: String, message: String, username: string }>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  sendMessage(data) {
    this.socket.emit('message', data);
  }
  check(data) {
    this.socket.emit('message', data);
  }
  sendMessagefornotification(data) {
    this.socket.emit('messageForNotification', data);
  }
  newMessageReceived() {
    let observable = new Observable<{ user: String, message: String, username: string }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  newMessageReceivedForNotification() {
    let observable = new Observable<{ user: String, message: String, username: string }>(observer => {
      this.socket.on('new message for notification', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  newMessageReceivedForNotificationapp() {
    let observable = new Observable<{ user: String, message: String, username: string }>(observer => {
      this.socket.on('new message for notificationapp', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }
  newMessageReceivedForNotificationinchat() {
    let observable = new Observable<{ user: String, message: String, username: string, cmsid: string }>(observer => {
      this.socket.on('new message for notification', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  getByMobile(mobile: any): any {
    throw new Error("Method not implemented.");
  }

  /* ------------------------------------------------- CHAT SERVICES END ------------------------------------------------------------- */





  /* ------------------------------------------------- NEARLUK SERVICE API'S -----------------------------------------------------------*/


  /* --------------------------------------------------- GET SERVICE API'S ------------------------------------------------------------ */
  getPropertyType(): Observable<any> {
    return this.http.get(this.Url + "/property/getPropertyTypes", { responseType: 'json' })
  }

  getPropertyCategory(): Observable<any> {
    return this.http.get(this.Url + "/property/getPropertyCategory", { responseType: 'json' })
  }
  getAmenties(propertyTypeId: any): Observable<any> {

    return this.http.get(this.Url + "/property/getPropertyAmenitiesByPropertyTypeId/" + propertyTypeId, { responseType: 'json' })
  }
  getFacilities(propertyTypeid: any): Observable<any> {

    return this.http.get(this.Url + '/property/getPropertyFacilitiesByPropertyTypeId/' + propertyTypeid, { responseType: 'json' })
  }
  getAllPropertys(state: any, city: any, userid: any): Observable<any> {


    return this.http.get(this.Url + "/tenant/GetAllProperties/" + city + '/' + state + '/' + userid, { responseType: 'json' })
  }

  getproperty(userid: any, limit: any): Observable<any> {

    return this.http.get(this.Url + "/property/getProperty/" + userid + '/' + limit, { responseType: 'json' })
  }

  getpropertynew(userid: any, limit: any): Observable<any> {

    return this.http.get(this.Url + "/property/getPropertynew/" + userid + '/' + limit, { responseType: 'json' })
  }

  getcountries(): Observable<any> {
    return this.http.get(this.Url + '/property/property/getcountry', { responseType: 'json' })
  }
  getStates(id: any): Observable<any> {

    return this.http.get(this.Url + '/property/getstates/' + id, { responseType: 'json' })
  }
  getCities(id: any): Observable<any> {

    return this.http.get(this.Url + '/property/getcities/' + id, { responseType: 'json' })
  }
  getArea(id: any): Observable<any> {

    return this.http.get(this.Url + '/property/getarea/' + id, { responseType: 'json' })
  }
  getMoreDetails(propertyId: any, session_id: any): Observable<any> {
    return this.http.get(this.Url + "/property/getmoredetails/" + propertyId + '/' + session_id, { responseType: 'json' })
  }
  GetImages(id: any): Observable<any> {
    return this.http.get('http://localhost:3400/property/images' + '/' + id, { responseType: 'json' })
  }
  getFavouriteDetails(userid: any, limit: any): Observable<any> {

    return this.http.get(this.Url + '/tenant/getFavourites/' + userid + '/' + limit, { responseType: 'json' })
  }

  getFavouriteDetailsnew(userid: any, limit: any): Observable<any> {

    return this.http.get(this.Url + '/tenant/getFavouritesnew/' + userid + '/' + limit, { responseType: 'json' })
  }
  getSectionid(sectionid: any): Observable<any> {
    return this.http.get(this.Url + '/tenant/getSection/' + sectionid, { responseType: 'json' })
  }
  //**Bidding */
  getBidding(propertyid: any): Observable<any> {
    return this.http.get(this.Url + '/tenant/Bidding/bidding/' + propertyid, { responseType: 'json' })
  }
  detailsforbiding(id: any): Observable<any> {
    return this.http.get(this.Url + '/tenant/Bidding/id/' + id, { responseType: 'json' })
  }
  getOwnersInfo(id: any, userid: any): Observable<any> {
    return this.http.get(this.Url + "/tenant/ownersInfo/id/" + id + '/' + userid, { responseType: 'json' });
  }
  //get comapre
  GetCompare(propertyId1: any, propertyId2: any, propertyId3: any): Observable<any> { //compare properties

    return this.http.get(this.Url + "/tenant/getCompare/" + propertyId1 + '/' + propertyId2 + '/' + propertyId3, { responseType: 'json' })
  }
  //=======================userprofile==================================
  getUserbyUsersession(userSession: any): Observable<any> {
    return this.http.get(this.Url + '/nearluk/userProfile/' + userSession, { responseType: 'json' })
  }
  getComments(propertyid: any): Observable<any> {
    return this.http.get(this.Url + '/property/getcomments/' + propertyid, { responseType: 'json' })
  }
  getCommentsbyid(propertyid: any, userid: any): Observable<any> {

    return this.http.get(this.Url + '/property/getcommentbyid/' + propertyid + '/' + userid, { responseType: 'json' })
  }
  getAllikes(propertyid: any): Observable<any> {
    return this.http.get(this.Url + '/tenant/getalllikes/' + propertyid, { responseType: 'json' })
  }
  filtersearch(filtersearch: filters) {
    this.filterObj.cityName = filtersearch.cityName
    this.filterObj.facing = filtersearch.facing
    this.filterObj.maxprice = filtersearch.maxprice
    this.filterObj.minprice = filtersearch.minprice
    this.filterObj.propertyTypeId = filtersearch.propertyTypeId
    this.filterObj.rating = filtersearch.rating
    this.filterObj.veification = filtersearch.veification
    this.filterObj.propertyName = filtersearch.propertyName
    this.filterObj.location = filtersearch.location
    this.filterObj.locationId = filtersearch.locationId
    // return this.http.post(this.Url + '/tenant/filters/search', JSON.stringify(filtersearch), this.httpOptions)
  }
  cityAutoComplete(value: any): Observable<any> {
    return this.http.get(this.Url + '/tenant/cityAutoComplete/' + value, { responseType: 'json' })
  }
  areaAutoComplete(value: any): Observable<any> {
    return this.http.get(this.Url + '/tenant/areaAutoComplete/' + value, { responseType: 'json' })
  }
  GetAllAgents(city: any): Observable<any> {
    return this.http.get(this.Url + '/agent/getAllAgents/' + city, { responseType: 'json' })
  }
  MyAgents(userid: any, page: any): Observable<any> {
    return this.http.get(this.Url + '/agent/MyAgents/' + userid + '/' + page, { responseType: 'json' })
  }
  getMyOwners(agentid: any, page: any): Observable<any> {
    return this.http.get(this.Url + '/agent/myowners/' + agentid + '/' + page, { responseType: 'json' })
  }
  getNotificationsbyuserid(userid: any): Observable<any> {
    return this.http.get(this.Url + '/agent/getnotificationsbyusername/' + userid, { responseType: 'json' })
  }
  getagentnotifications_count(userid: any): Observable<any> {
    return this.http.get(this.Url + '/agent/getagentnotifications_count/' + userid, { responseType: 'json' })
  }
  getBiddingPropertyDetails(userid: any, page: any): Observable<any> {
    return this.http.get(this.Url + '/tenant/BiddingGetByuserid/' + userid + '/' + page, { responseType: 'json' })
  }
  getBiddingPropertyDetailsnew(userid: any, page: any): Observable<any> {
    return this.http.get(this.Url + '/tenant/BiddingGetByuseridnew/' + userid + '/' + page, { responseType: 'json' })
  }
  getpropertybyareaorcity(city: any, area: any): Observable<any> {

    return this.http.get(this.Url + '/tenant/getpropertybyareaorcity/' + area + '/' + city, { responseType: 'json' });
  }
  getUserDetails(userid: any): Observable<any> {
    return this.http.get(this.Url + "/nearluk/getUserDetails/" + userid, { responseType: 'json' })
  }
  dataToSendNotification(property_id: any, username: any): Observable<any> {
    return this.http.get(this.Url + '/agent/dataToSendNotification/' + property_id + '/' + username, { responseType: 'json' })
  }
  agentAdded(property_id: any, agent: any): Observable<any> {
    return this.http.get(this.Url + '/agent/agentAdded/' + property_id + '/' + agent, { responseType: 'json' })
  }
  getPropertyDetailsForUpdate(property_id: any): Observable<any> {
    return this.http.get(this.Url + '/property/getPropertyDetailsforUpdate/' + property_id, { responseType: 'json' })
  }
  getFacilitiesUserNotSelect(propertyId: any): Observable<any> {
    return this.http.get(this.Url + "/property/getPropertyFacilitiesByPropertyIdUsernotselected/" + propertyId, { responseType: 'json' })
  }
  getAmenitiesUserNotSelect(propertyId: any): Observable<any> {
    return this.http.get(this.Url + "/property/getPropertyAmenitiesByPropertyIdUsernotselected/" + propertyId, { responseType: 'json' })
  }
  getPropertyDetailsForMap(propertyId): Observable<any> {
    return this.http.get(this.Url + "/tenant/getPropertyDetail/forMap/" + propertyId, { responseType: 'json' })
  }
  getallfavs(propertyId: any, userid: any): Observable<any> {
    return this.http.get(this.Url + '/tenant/getallfavs/' + userid + '/' + propertyId, { responseType: 'json' })
  }
  getpropertyviews(propertyId: any): Observable<any> {
    return this.http.get(this.Url + '/property/getpropertyviews/' + propertyId, { responseType: 'json' })
  }
  dataForAgentNotification(propertyid: any, username: any, type: string): Observable<any> {
    return this.http.get(this.Url + '/agent/getDataForAgentNotification/' + propertyid + '/' + username + '/' + type, { responseType: 'json' })
  }
  getDataForNotification(propertyId: any, userid: any): Observable<any> {
    return this.http.get(this.Url + '/agent/getDataForNotification/' + propertyId + '/' + userid, { responseType: 'json' })
  }
  getaveragebyarea(propertytypeid, areaid): Observable<any> {
    return this.http.get(this.Url + '/tenant/averagebyarea/' + propertytypeid + '/' + areaid, { responseType: 'json' })
  }
  getproertytypebylatlng(lat: any, lan: any, typeid: any, city: any): Observable<any> {
    return this.http.get(this.Url + '/property/propertydetailsbyarea/' + lat + '/' + lan + '/' + typeid + '/' + city, { responseType: 'json' })
  }
  propertyAutoComplete(value: any): Observable<any> {
    return this.http.get(this.Url + '/tenant/propertyAutoComplete/' + value, { responseType: 'json' })
  }
  cityCount(): Observable<any> {
    return this.http.get(this.Url + '/nearluk/Cities/count', { responseType: 'json' })
  }
  oldPasswordCheck() {
    var session = sessionStorage.getItem('user');
    return this.http.get(this.Url + '/nearluk/UseroldPassword/' + session, { responseType: 'json' })
  }
  getPropertiesByCity(cid: any, uid: any, page: any): Observable<any> {
    return this.http.get(this.Url + '/nearluk/property/' + cid + '/' + uid + '/' + page, { responseType: 'json' })
  }
  getPropertiesByCitynew(cid: any, uid: any, page: any): Observable<any> {
    return this.http.get(this.Url + '/nearluk/propertynew/' + cid + '/' + uid + '/' + page, { responseType: 'json' })
  }
  getPropertiesByCitynew1(cid: any, uid: any, propertytypeid: any, page: any): Observable<any> {
    return this.http.get(this.Url + '/nearluk/propertynewtypes/' + cid + '/' + uid + '/' + propertytypeid + '/' + page, { responseType: 'json' })
  }
  getPropertiesByCitytypes(cid: any, uid: any, page: any): Observable<any> {
    return this.http.get(this.Url + '/nearluk/propertytypes/' + cid + '/' + uid + '/' + page, { responseType: 'json' })
  }
  deleteImages(image: any, property_id: any): Observable<any> {
    return this.http.get(this.Url + '/property/deleteImage/' + image + '/' + property_id, { responseType: 'json' })
  }
  // searchall
  searchall(valuename: any, limit: any): Observable<any> {
    // alert(valuename)
    return this.http.get(this.Url + '/tenant/search/all/' + valuename + '/' + limit, { responseType: 'json' })
  }
  getCityidbyPropertytype(propertyType: any, statename: any, cityname: any, userid: any, page: any): Observable<any> {
    return this.http.get(this.Url + '/property/getmorepropertys/' + propertyType + '/' + statename + '/' + cityname + '/' + userid + '/' + page, { responseType: 'json' })
  }
  getCityidbyPropertytypenew(propertyType: any, statename: any, cityname: any, userid: any, page: any): Observable<any> {
    return this.http.get(this.Url + '/property/getmorepropertysnew/' + propertyType + '/' + statename + '/' + cityname + '/' + userid + '/' + page, { responseType: 'json' })
  }
  CheckinEnquiryFormuser(userid: any) {
    return this.http.get(this.Url + '/tenant/getDataInEnquiryForm/' + userid, { responseType: 'json' })
  }
  GetPropertyRecommendations(userid: any) {
    return this.http.get(this.Url + '/tenant/getDataInEnquiryForm/' + userid, { responseType: 'json' })
  }
  getprofileimage(userid: any): Observable<any> {
    return this.http.get(this.Url + '/nearluk/Imagepic/' + userid, { responseType: 'json' })
  }
  // packers and movers
  getLoans(): Observable<any> {
    return this.http.get(this.Url + '/tenant/getLoans/', { responseType: 'json' })
  }
  getPakcers(): Observable<any> {
    return this.http.get(this.Url + '/tenant/getPakcers/', { responseType: 'json' })
  }
  // admin
  GetAdminHomeDetails(page: any): Observable<any> {  // admin Home get
    return this.http.get(this.Url + '/admin/adminhome/' + page, { responseType: 'json' });
  }
  getContact(): Observable<any> {
    return this.http.get(this.Url + '/admin/Contacts/', { responseType: 'json' });
  }
  getagentnotifications(userid: any): Observable<any> {
    return this.http.get(this.Url + '/agent/getagentnotifications/' + userid, { responseType: 'json' })
  }
  deleteprofileImages(image: any, userid: any): Observable<any> {
    return this.http.get(this.Url + '/property/profile/Image/delete/' + userid, { responseType: 'json' })
  }
  verifyUser(sessionid: any): Observable<any> {
    return this.http.get(this.Url + '/nearluk/verify/' + sessionid, { responseType: 'json' })
  }
  verifyemails(userid: any): Observable<any> {
    return this.http.get(this.Url + '/nearluk/verifysendemails/' + userid, { responseType: 'json' });
  }
  GetFeturedProperties(): Observable<any> {
    return this.http.get(this.Url + '/property/GetFeaturedProperties/', { responseType: 'json' });
  }
  GetFeturedPropertiestypes(): Observable<any> {
    return this.http.get(this.Url + '/property/GetFeaturedPropertiestypes/', { responseType: 'json' });
  }
  GetFeaturesByPropertyType(propertytypeid: any): Observable<any> {
    return this.http.get(this.Url + '/nearluk/featuredproperty/' + propertytypeid, { responseType: 'json' });
  }
  GetPropertyTypeByPropertyCategory(propertycategoryid: any): Observable<any> {
    return this.http.get(this.Url + '/nearluk/getpropertytypes/' + propertycategoryid, { responseType: 'json' });
  }
  GetFeatured(id: any, uid: any, limit: any): Observable<any> {
    return this.http.get(this.Url + '/property/GetAll/GetFeaturedProperties/' + id + '/' + uid + '/' + limit, { responseType: 'json' });
  }
  Getrecentviewdpropertys(id: any, limit: any): Observable<any> {
    return this.http.get(this.Url + '/property/getviewedproperties/' + id + '/' + limit, { responseType: 'json' });
  }
  GetDropDownisds(country: any): Observable<any> {  // ISD Dropdown for register page
    return this.http.get(this.Url + '/nearluk/getAllIsdNumbers/' + country, { responseType: 'json' })
  }
  sendotp(phno: any): Observable<any> {
    return this.http.get(this.Url + '/otp/' + phno, { responseType: 'json' })
  }
  resetpasswordsendotp(phno: any): Observable<any> {
    return this.http.get(this.Url + '/otp/resetpasswordsendotp/' + phno, { responseType: 'json' })
  }
  verify(a: any, b: any): Observable<any> {
    return this.http.get(this.Url + '/verify/' + a + '/' + b, { responseType: 'json' })
  }
  verifyupdate(otpencriptkey: any, otpvalue: any, userid: any, password: any): Observable<any> {
    return this.http.get(this.Url + '/verify/updatepassword/' + otpencriptkey + '/' + otpvalue + '/' + userid + '/' + password, { responseType: 'json' })
  }
  getotpMobile(mobile: any): Observable<any> {  // Login Check
    return this.http.get(this.Url + '/nearluk/getBymobile/' + mobile, { responseType: 'json' });
  }
  getSms(userid: any, propertyid: any): Observable<any> {
    return this.http.get(this.Url + '/property/getSms/' + userid + '/' + propertyid, { responseType: 'json' });
  }
  chatMapp(userid1: any, userid2: any, propertid: any, session: any): Observable<any> {
    return this.http.get(this.Url + '/chat/chat/' + userid1 + '/' + userid2 + '/' + propertid + '/' + session, { responseType: 'json' });
  }
  getChatMapp(userid1: any): Observable<any> {
    return this.http.get(this.Url + '/chat/getChatMapp/' + userid1, { responseType: 'json' });
  }
  getChat(roomid: any): Observable<any> {
    return this.http.get(this.Url + '/chat/getChat/' + roomid, { responseType: 'json' });
  }
  deletechatnoti(userid: any, cmsid: any): Observable<any> {
    return this.http.get(this.Url + '/chat/delete/chat/noti/' + userid + '/' + cmsid, { responseType: 'json' });
  }
  deleteappchatcount(userid: any): Observable<any> {
    return this.http.get(this.Url + '/chat/appdelete/chat/noti/appchat' + userid, { responseType: 'json' });
  }
  checkusersession(session_id: any): Observable<any> {
    return this.http.get(this.Url + '/nearluk/chechkusingsessionid/' + session_id, { responseType: 'json' });
  }

  propertyPostingCount(userId: number): Observable<any> {
    return this.http.get(this.Url + '/property/propertyPostingCount/' + userId, { responseType: 'json' });
  }

  pricingDetails(): Observable<any> {
    return this.http.get(this.Url + '/nearluk/pricingdetails/', { responseType: 'json' });
  }
  featuresPricingDetails(): Observable<any> {
    return this.http.get(this.Url + '/nearluk/featurespricingdetails/', { responseType: 'json' });
  }


  interestCheck(propertyid: any, userid: any): Observable<any> {
    return this.http.get(this.Url + '/tenant/getPostInterest/' + propertyid + '/' + userid, { responseType: 'json' });
  }

  mypropertyTransaction(userId: any): Observable<any> {
    return this.http.get(this.Url + '/property/mypropertyTransaction/' + userId, { responseType: 'json' });
  }

  getBhkTypes(): Observable<any> {
    return this.http.get(this.Url + '/property/getBhkTypes', { responseType: 'json' });
  }

  getBuildingTypes(): Observable<any> {
    return this.http.get(this.Url + '/property/getBuildingTypes', { responseType: 'json' });
  }

  getFurnishedType(): Observable<any> {
    return this.http.get(this.Url + '/property/getFurnishedType', { responseType: 'json' });
  }

  getFloorType(): Observable<any> {
    return this.http.get(this.Url + '/property/getFloorType', { responseType: 'json' });
  }

  getNoiseLevel(): Observable<any> {
    return this.http.get(this.Url + '/property/getNoiseLevel', { responseType: 'json' });
  }

  getFeatures(): Observable<any> {
    return this.http.get(this.Url + '/property/getFeatures', { responseType: 'json' });
  }

  getResidenceFurnishings(): Observable<any> {
    return this.http.get(this.Url + '/property/getResidenceFurnishings', { responseType: 'json' });
  }

  getCommonFurnishings(): Observable<any> {
    return this.http.get(this.Url + '/property/getCommonFurnishings', { responseType: 'json' });
  }

  getShareTypes(): Observable<any> {
    return this.http.get(this.Url + '/property/getShareTypes', { responseType: 'json' });
  }

  getFoodType(): Observable<any> {
    return this.http.get(this.Url + '/property/getFoodType', { responseType: 'json' });
  }

  getAlcoholType(): Observable<any> {
    return this.http.get(this.Url + '/property/getAlcoholType', { responseType: 'json' });
  }

  getFoodprovisionType(): Observable<any> {
    return this.http.get(this.Url + '/property/getFoodprovisionType', { responseType: 'json' });
  }

  getDecorationprovisionType(): Observable<any> {
    return this.http.get(this.Url + '/property/getDecorationprovisionType', { responseType: 'json' });
  }

  getOtherpoliciesType(): Observable<any> {
    return this.http.get(this.Url + '/property/getOtherpoliciesType', { responseType: 'json' });
  }
 
  getEventTypes(): Observable<any> {
    return this.http.get(this.Url + '/property/getEventTypes', { responseType: 'json' });
  }

  getHallTypes(): Observable<any> {
    return this.http.get(this.Url + '/property/getHallTypes', { responseType: 'json' });
  }


  getHosteltermsandpolicies(): Observable<any> {
    return this.http.get(this.Url + '/property/getHosteltermsandpolicies', { responseType: 'json' });
  }

  getPlaygroundtermsandpolicies(): Observable<any> {
    return this.http.get(this.Url + '/property/getPlaygroundtermsandpolicies', { responseType: 'json' });
  }


  getEventFeaturesofvenue(): Observable<any> {
    return this.http.get(this.Url + '/property/getEventFeaturesofvenue', { responseType: 'json' });
  }


  getHostelac(): Observable<any> {
    return this.http.get(this.Url + '/property/getHostelac', { responseType: 'json' });
  }


  getHostelnonac(): Observable<any> {
    return this.http.get(this.Url + '/property/getHostelnonac', { responseType: 'json' });
  }

  getPlaygroundfeatures(): Observable<any> {
    return this.http.get(this.Url + '/property/getPlaygroundfeatures', { responseType: 'json' });
  }
  getVehiclefeatures(): Observable<any> {
    return this.http.get(this.Url + '/property/getVehiclefeatures', { responseType: 'json' });
  }

  getPropertyshownby(): Observable<any> {
    return this.http.get(this.Url + '/property/getPropertyshownby', { responseType: 'json' });
  }
  getSmoking(): Observable<any> {
    return this.http.get(this.Url + '/property/getSmoking', { responseType: 'json' });
  }
  getDrinking(): Observable<any> {
    return this.http.get(this.Url + '/property/getDrinking', { responseType: 'json' });
  }
  getPropertyrent(): Observable<any> {
    return this.http.get(this.Url + '/property/getPropertyrent', { responseType: 'json' });
  }
  getPropertysecuritydeposit(): Observable<any> {
    return this.http.get(this.Url + '/property/getPropertysecuritydeposit', { responseType: 'json' });
  }
  /* --------------------------------------------------- GET SERVICE API'S END ------------------------------------------------------- */

  /* --------------------------------------------------- POST SERVICE API'S ------------------------------------------------------------ */
  payment(userId: number, posted_property_id: any): Observable<any> {
    return this.http.get(this.Url + '/payment/request/' + userId + '/' + posted_property_id, { responseType: 'json' })
  }


  login(login: Login): Observable<any> {
    return this.http.post(this.Url + '/nearluk/Login', JSON.stringify(login), this.httpOptions)
  }
  PostProperty(property: property): Observable<any> {
    return this.http.post(this.Url + '/property/PropertyDetails/Add/', JSON.stringify(property), this.httpOptions)
  }
  fogotPwd(em: Forgot): Observable<any> {
    return this.http.post(this.Url + '/nearluk/Forgot/Password', JSON.stringify(em), this.httpOptions)
  }
  changePassword(confirmpwd: any, session: any): Observable<any> {
    return this.http.post(this.Url + '/nearluk/Change/Password/' + confirmpwd + '/' + session, this.httpOptions)
  }
  updatePassword(confirmpwd: any, currentsession: any, oldpwd: any): Observable<any> {
    return this.http.post(this.Url + '/nearluk/Update/Password/' + confirmpwd + '/' + currentsession + '/' + oldpwd, this.httpOptions)
  }
  postfavourite(propertyid: any, userid: any): Observable<any> {
    return this.http.post(this.Url + '/tenant/addFavouritePost/' + propertyid + '/' + userid, this.httpOptions)
  }
  priceSend(Bidd: Bidding): Observable<any> {
    return this.http.post(this.Url + '/tenant/Bidding/send', JSON.stringify(Bidd), this.httpOptions)
  }
  updateUser(profile: Profile) {
    return this.http.post(this.Url + '/nearluk/update/userProfile/', JSON.stringify(profile), this.httpOptions)
  }
  verifyemail(email: any, userid: any) {
    let user = sessionStorage.getItem('user')
    return this.http.post(this.Url + '/nearluk/update/verifymail/' + email + '/' + user + '/' + userid, this.httpOptions)
  }
  commentSend(forum: forum): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    return this.http.post(this.Url + '/property/forum', JSON.stringify(forum), httpOptions)
  }
  likeSend(propertyid: any, userid: any): Observable<any> {
    return this.http.post(this.Url + '/tenant/likes/' + propertyid + '/' + userid, this.httpOptions)
  }
  putProfileImages(images: Profile): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    return this.http.post(this.Url + '/nearluk/putProfileImages/', JSON.stringify(images), httpOptions)
  }
  sendNotification(agent: agent): Observable<any> {
    return this.http.post(this.Url + '/agent/sendnotification/', JSON.stringify(agent), this.httpOptions)
  }
  addagentnotifications(notification: tenantnotifications): Observable<any> {
    return this.http.post(this.Url + '/tenant/TenantNotifications/Add/', JSON.stringify(notification), this.httpOptions)
  }
  insertowneragent(addagent: owneraddagent): Observable<any> {
    return this.http.post(this.Url + '/agent/insertOwnerAddAgent/', JSON.stringify(addagent), this.httpOptions)
  }
  updateagentrequest(notification_id: any, status: any): Observable<any> {
    return this.http.post(this.Url + '/owner/notificationstatus/' + notification_id + '/' + status, this.httpOptions)
  }
  nearU(nearU: propertytype, page: any): Observable<any> {
    return this.http.post(this.Url + "/tenant/getLatLng/" + page, JSON.stringify(nearU), this.httpOptions)
  }
  addAmenities(propertyId: any, amenityId: any, amenityValue): Observable<any> {
    //Aminities Post
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    return this.http.post(this.Url + '/property/amenitiesPost/' + propertyId + '/' + amenityId + '/' + amenityValue, httpOptions)
  }
  addFacilities(facilities: any, propertyId: any): Observable<any> {
    // Facilities Post
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    return this.http.post(this.Url + '/property/facilitiesPost/' + propertyId + '/' + facilities, httpOptions)
  }
  SendContact(contact: contactus): Observable<any> {
    return this.http.post(this.Url + "/tenant/Contactpost/", JSON.stringify(contact), this.httpOptions)
  }
  filtersearching(filtersearch: filters, page: any) {
    this.filterObj.cityName = filtersearch.cityName
    this.filterObj.facing = filtersearch.facing
    this.filterObj.maxprice = filtersearch.maxprice
    this.filterObj.minprice = filtersearch.minprice
    this.filterObj.propertyTypeId = filtersearch.propertyTypeId
    this.filterObj.rating = filtersearch.rating
    this.filterObj.veification = filtersearch.veification
    this.filterObj.propertyName = filtersearch.propertyName
    this.filterObj.userId = filtersearch.userId
    this.filterObj.location = filtersearch.location
    this.filterObj.locationId = filtersearch.locationId
    if (this.filterObj.cityName != undefined) {
      return this.http.post(this.Url + '/tenant/filters/search/' + page, JSON.stringify(this.filterObj), this.httpOptions)
    } else {
      this.router.navigate(['home'])
    }
  }

  filtersearchingnew(filtersearch: filters, page: any) {
    this.filterObj.cityName = filtersearch.cityName
    this.filterObj.facing = filtersearch.facing
    this.filterObj.maxprice = filtersearch.maxprice
    this.filterObj.minprice = filtersearch.minprice
    this.filterObj.propertyTypeId = filtersearch.propertyTypeId
    this.filterObj.rating = filtersearch.rating
    this.filterObj.veification = filtersearch.veification
    this.filterObj.propertyName = filtersearch.propertyName
    this.filterObj.userId = filtersearch.userId
    if (this.filterObj.cityName != undefined) {
      return this.http.post(this.Url + '/tenant/filters/searchnew/' + page, JSON.stringify(this.filterObj), this.httpOptions)
    } else {
      this.router.navigate(['home'])
    }
  }
  propertystatus(property_id: any, status: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    return this.http.post(this.Url + '/property/propertystatus/' + property_id + '/' + status, httpOptions)
  }
  // Enquiry form
  EnquiryFormAdd(enqFrm: EnquiryForm): Observable<any> { //Enquiry form add
    return this.http.post(this.Url + '/tenant/enquiryForm/Post', JSON.stringify(enqFrm), this.httpOptions)
  }
  SearchInOwnerPrpertyByEnquiryForm(Enquiry: EnquiryForm, page: any): Observable<any> {
    return this.http.post(this.Url + '/tenant/getRecommendationsData1new/' + page, JSON.stringify(Enquiry), this.httpOptions)
  }

  GetSorting(adminsearch: postmap): Observable<any> {
    return this.http.post(this.Url + '/admin/verified', JSON.stringify(adminsearch), this.httpOptions)
  }
  GetSortingActive(adminsearch: postmap): Observable<any> {
    return this.http.post(this.Url + '/admin/GetSortingActive/', JSON.stringify(adminsearch), this.httpOptions)
  }
  adminnotification(notify): Observable<any> {
    return this.http.post(this.Url + '/admin/adminnotification', JSON.stringify(notify), this.httpOptions)
  }
  getaddressidsusingname(postmap: postmap): Observable<any> {
    return this.http.post(this.Url + '/property/propertymapadd/Add/', JSON.stringify(postmap), this.httpOptions)
  }
  logingetalldetails(login: Login): Observable<any> {
    return this.http.post(this.Url + '/nearluk/logingetalldetails', JSON.stringify(login), this.httpOptions)
  }
  addagenttoowner(notification: addagent): Observable<any> {
    return this.http.post(this.Url + '/tenant/TenantNotifications/Add/', JSON.stringify(notification), this.httpOptions)
  }
  getNotificationsbyuserid1(userid: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    return this.http.post(this.Url + '/agent/getnotifications/' + userid, httpOptions)
  }
  RegisterPost(register: registration): Observable<any> { // Posting Registration Page
    return this.http.post(this.Url + '/nearluk/Registration/Add/', JSON.stringify(register), this.httpOptions)
  }
  Featuredfilters(featured: featurefilters, uid: any, page: any): Observable<any> {
    return this.http.post(this.Url + '/tenant/FeaturedPropertynew/filters' + '/' + uid + '/' + page, JSON.stringify(featured), this.httpOptions)
  }

  cftoken(reqData: any): Observable<any> {

    return this.http.post(this.Url + '/payment/cftoken', reqData, this.httpOptions);
  }



  postinterset(propertyid: any, userid: any): Observable<any> {
    return this.http.post(this.Url + '/tenant/addPostInterest/' + propertyid + '/' + userid, this.httpOptions)
  }

  /* --------------------------------------------------- POST SERVICE API'S END -------------------------------------------------------- */

  /* --------------------------------------------------- PUT SERVICE API'S ------------------------------------------------------------ */
  updateProperty(property: property): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    return this.http.put(this.Url + '/property/updateProperty/' + property.propertyId, JSON.stringify(property), httpOptions)
  }
  deletemyprop(pid: any): Observable<any> {

    return this.http.put(this.Url + '/property/deleteMyProperty/' + pid, this.httpOptions)
  }
  EnquiryFormUpdate(Enq: EnquiryForm) {
    return this.http.put(this.Url + '/tenant/updateEnquiryForm/' + Enq.userid, JSON.stringify(Enq), this.httpOptions)
  }
  verified(propertyid: any): Observable<any> {
    return this.http.put(this.Url + '/admin/verification/' + propertyid, {}, this.httpOptions)
  }
  Inactive(propertyid: any, status: any): Observable<any> {
    return this.http.put(this.Url + '/admin/Inactive/' + propertyid + '/' + status, {}, this.httpOptions)
  }
  updateStatus(ct_id: any): Observable<any> {
    return this.http.put(this.Url + '/admin/AdminContact/' + ct_id, this.httpOptions)
  }






  /* --------------------------------------------------- PUT SERVICE API'S END -------------------------------------------------------- */

  /* --------------------------------------------------- DELETE SERVICE API'S ------------------------------------------------------------ */

  removefav(propertyid: any, userid: any): Observable<any> {

    return this.http.delete(this.Url + '/tenant/removeFavouritePost/' + propertyid + '/' + userid, this.httpOptions)
  }
  deleteMyAgent(pid: any, agent: any): Observable<any> {
    return this.http.delete(this.Url + '/agent/deleteMyAgent/' + pid + '/' + agent, { responseType: 'json' })
  }
  deleteFacilitiesAndAmnities(property_id: any): Observable<any> {
    return this.http.delete(this.Url + '/property/deleteFacilitiesAndAmnities/' + property_id, { responseType: 'json' })
  }




  /* --------------------------------------------------- DELETE SERVICE API'S END -------------------------------------------------------- */




}