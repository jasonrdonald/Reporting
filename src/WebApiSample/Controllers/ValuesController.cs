using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using WebApiSample.Models;
using System.Linq;
using WebApiSample.InitializeData;

namespace WebApiSample.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }


        [HttpGet]
        [Route("[action]")]
        public List<Product> GetProducts()
        {
            List<Product> lstp = new List<Product>();
            lstp = InitData.lstProducts;
            return lstp;
        }

        [Route("[action]")]
        public string PostURL(CreateAdd value)
        {
            try
            {
                var id = InitData.lstAdds.Count;
                CreateAdd objAdd = new CreateAdd();
                objAdd.AgeGroup = value.AgeGroup;
                objAdd.AgeGroupRange = value.AgeGroupRange;
                objAdd.ImageURL = "images/I6_Black.jpeg";
                objAdd.Browser = value.Browser;
                objAdd.Device = value.Device;
                objAdd.Gender = value.Gender;
                objAdd.Region = value.Region;
                objAdd.AddDesc = value.AddDesc;
                objAdd.URL = "http://cfsamplewithab.cfapps.io/" + value.URL;
                objAdd.RegionName = value.RegionName;
                objAdd.ID = id + 1;
                objAdd.Promo = value.Promo;
                objAdd.PromoName = value.PromoName;
                InitData.lstAdds.Add(objAdd);

                return ("ok").ToUpper();
            }
            catch
            {
                return ("Error").ToUpper();
            }
        }
        [Route("[action]")]
        public List<CreateAdd> getUrlNames()
        {
            return InitData.lstAdds;
        }
        [Route("[action]/{id}")]
        public string IncrementCounter(Product value)
        {
            var Product = InitData.lstProducts.Where(kvp => kvp.ID == value.ID && kvp.Promo == value.Promo).Select(x => x).ToArray();

            if (Product != null && Product.Length == 1)
            {
                Product[0].Views = Product[0].Views + 1;
            }
            return "OK";
        }

        [Route("[action]/{id}")]
        public JsonResult GetProductsDetails(int id)
        {
            var Product = InitData.lstProducts.Where(kvp => kvp.ID == id).Select(x => x).ToArray();
            return Json(Product);
        }

        [Route("[action]/{id}")]
        public string UpdatePurchased(int id)
        {
            var Product = InitData.lstProducts.Where(kvp => kvp.ID == id).Select(x => x).ToArray();

            if (Product != null && Product.Length == 1)
            {
                Product[0].TotalNoOfPurchases = Product[0].TotalNoOfPurchases + 1;
            }
            return "ok";
        }


        [Route("[action]")]
        public JsonResult AddsViewHistory(AddsHistory value)
        {
            AddsHistory objAdd = new AddsHistory();
            objAdd.AgeGroup = value.AgeGroup;
            objAdd.Gender = value.Gender;
            objAdd.Region = value.Region;
            objAdd.Views = value.Views;
            objAdd.ID = value.ID;
            InitData.lstAddsHistory.Add(objAdd);
            return Json("ok");
        }

        [Route("[action]/{id}")]
        public JsonResult getRegionAds(int id)
        {
            //Need to filter by AdID
            List<RegionMap> rmList = new List<RegionMap>();
            RegionMap rm = new RegionMap();
            //List<AddsHistory> Ad = InitData.lstAddsHistory.Where(kvp => kvp.ID == id).ToList<AddsHistory>();
            List<AddsHistory> Ad = InitData.lstAddsHistory;
            //rm.AdId = InitData.lstAdds[0].AdId;
            //rm.region = Ad[0].Region;
            //rm.hits = Ad[0].Views;

            #region test data
            rm.region = "California";
            rm.hits = 233;
            rmList.Add(rm);

            rm = new RegionMap();
            rm.region = "Texas";
            rm.hits = 319;
            rmList.Add(rm);

            rm = new RegionMap();
            rm.region = "New York";
            rm.hits = 386;
            rmList.Add(rm);
            #endregion

            return Json(rmList);
        }

        [Route("[action]/{Param}")]
        public JsonResult getAgeGroup(string Param)
        {
            //string[] paramArray = Param.Split('&');
            string id = "";// = paramArray[0];
            id = "1";
            string Region = ""; //= paramArray[1];
            Region = "California";
            //Filter by both ADID / Region
            List<AgeGrouping> agList = new List<AgeGrouping>();
            AgeGrouping ag = new AgeGrouping();
            //List<AddsHistory> Ad = InitData.lstAddsHistory.Where(kvp => kvp.Region == Region).ToList<AddsHistory>();
            List<AddsHistory> Ad = InitData.lstAddsHistory;
            //rm.AdId = InitData.lstAdds[0].AgeGroup;
            //ag.Region = Ad[0].Region;
            //ag.Under_5_Years = Ad.Where(kvp => kvp.AgeGroup == "Under 5 Years").ToList<AddsHistory>()[0].Views;
            //ag._5_to_13Years = Ad.Where(kvp => kvp.AgeGroup == "5 to 13Years").ToList<AddsHistory>()[0].Views;
            //ag._14_to_17_Years = Ad.Where(kvp => kvp.AgeGroup == "14 to 17 Years").ToList<AddsHistory>()[0].Views;
            //ag._18_to_24_Years = Ad.Where(kvp => kvp.AgeGroup == "_18 to 24 Years").ToList<AddsHistory>()[0].Views;
            //ag._25_to_44_Years = Ad.Where(kvp => kvp.AgeGroup == "25 to 44 Years").ToList<AddsHistory>()[0].Views;
            //ag._45_to_64_Years = Ad.Where(kvp => kvp.AgeGroup == "45 to 64 Years").ToList<AddsHistory>()[0].Views;
            //ag._65_Years_and_Over = Ad.Where(kvp => kvp.AgeGroup == "65 Years and Over").ToList<AddsHistory>()[0].Views;

            #region test data
            if (Param != "CA" && Param != "TX" && Param != "NY")
            {
                ag = new AgeGrouping();
                ag.Region = Param;
                ag.Under_5_Years = 32;
                ag._5_to_13Years = 25;
                ag._14_to_17_Years = 68;
                ag._18_to_24_Years = 45;
                ag._25_to_44_Years = 23;
                ag._45_to_64_Years = 46;
                ag._65_Years_and_Over = 67;

                agList.Add(ag);
            }
            else
            {
                ag = new AgeGrouping();
                ag.Region = "CA";
                ag.Under_5_Years = 45;
                ag._5_to_13Years = 55;
                ag._14_to_17_Years = 23;
                ag._18_to_24_Years = 12;
                ag._25_to_44_Years = 29;
                ag._45_to_64_Years = 32;
                ag._65_Years_and_Over = 47;
                agList.Add(ag);

                ag = new AgeGrouping();
                ag.Region = "TX";
                ag.Under_5_Years = 43;
                ag._5_to_13Years = 33;
                ag._14_to_17_Years = 56;
                ag._18_to_24_Years = 67;
                ag._25_to_44_Years = 14;
                ag._45_to_64_Years = 74;
                ag._65_Years_and_Over = 32;
                agList.Add(ag);

                ag = new AgeGrouping();
                ag.Region = "NY";
                ag.Under_5_Years = 15;
                ag._5_to_13Years = 45;
                ag._14_to_17_Years = 37;
                ag._18_to_24_Years = 85;
                ag._25_to_44_Years = 45;
                ag._45_to_64_Years = 84;
                ag._65_Years_and_Over = 75;
                agList.Add(ag);
            }
            #endregion

            return Json(agList);
        }

        [Route("[action]/{id}")]
        public JsonResult getRealTime(string Region)
        {
            Spline rt = new Spline();
            //List<AddsHistory> ahl = InitData.lstAddsHistory.Where(kvp => kvp.Region == Region).ToList<AddsHistory>();
            List<AddsHistory> ahl = InitData.lstAddsHistory;
            rt.AdsHistoryList = ahl;

            //ahl[0].Views
            #region test data
            List<List<object>> testlist = new List<List<object>>();
            List<object> testing = new List<object>();

            string[] values = new string[2] { "", "" };
            //int i = 1;
            foreach (var x in ahl)
            {
                values = new string[2] { x.Desc + "::" + x.Views, x.Views.ToString() };
                testing.Add(values);
            }
            testlist.Add(testing);
            /*
            testing.Add(values);
            values= new string[2] { "Nexus", ahl[0].Views.ToString() };
            */

            rt.columns = testlist;
            #endregion

            return Json(rt);

            //return 
        }

        [Route("[action]/{id}")]
        public int IncreaseAddClicks(int id)
        {
            var Product = InitData.lstAdds.Where(kvp => kvp.ID == id).Select(x => x).ToArray();

            if (Product != null && Product.Length == 1)
            {
                Product[0].Views = Product[0].Views + 1;
            }         
            return 1;
        }

        [Route("[action]")]
        public int IncreaseAddClicks()
        {
            List<CreateAdd> lst = InitData.lstAdds;

            foreach (CreateAdd ad in lst)
            {
                ad.Views = ad.Views + 20;

            }
            return 1;
        }

        [Route("[action]")]
        public int IncrementProductViews()
        {
            List<CreateAdd> lst = InitData.lstAdds;
            List<AddsHistory> lstHistory = InitData.lstAddsHistory;
            List<Product> lstProducts = InitData.lstProducts;

            foreach (Product ad in lstProducts)
            {
                ad.Views = ad.Views + 10;

            }
            return 1;
        }

        [Route("[action]")]
        public int IncreasePurchased()
        {
            List<CreateAdd> lst = InitData.lstAdds;
            List<AddsHistory> lstHistory = InitData.lstAddsHistory;
            List<Product> lstProducts = InitData.lstProducts;

            foreach (Product ad in lstProducts)
            {
                ad.TotalNoOfPurchases = ad.TotalNoOfPurchases + 5;

            }
            return 1;
        }
        
    }


}










