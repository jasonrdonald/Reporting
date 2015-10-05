using WebApiSample.Controllers;
using WebApiSample.InitializeData;
using WebApiSample.Models;
using Xunit;

namespace CFSampleWithAB.XUnit
{
   
    public class XunitTestCase1
    {       
        [Fact]
        public void CreateAdd()
        {
            string result = "";
            ValuesController obj = new ValuesController();
            InitData.lstAdds = null;
            CreateAdd objAdd5 = new CreateAdd();
            objAdd5.ID = 5;
            objAdd5.AgeGroup = "45T65";
            objAdd5.AgeGroupRange = "45 To 64 Years";
            objAdd5.Browser = "IE";
            objAdd5.Device = "Android";
            objAdd5.Gender = "M";
            objAdd5.Region = "KS";
            objAdd5.Promo = "FB";
            objAdd5.PromoName = "Facebook";
            objAdd5.RegionName = "Kansas";
            objAdd5.URL = "Product.html&AgeGroup=" + objAdd5.AgeGroup + "&Gender=" + objAdd5.Gender + "&Region=" + objAdd5.Region + "&Device=" + objAdd5.Device + "&Browser=" + objAdd5.Browser;
            objAdd5.ImageURL = "images/16_Black.jpeg";

            result = obj.PostURL(objAdd5).ToString();
            Assert.Equal("ERROR", result);
        }
        [Fact]
        public void CreateAddPass()
        {
            string result = "";
            InitData.lstAdds = null;
            ValuesController obj = new ValuesController();
            InitData.intialize();
            CreateAdd objAdd5 = new CreateAdd();
            objAdd5.ID = 5;
            objAdd5.AgeGroup = "45T65";
            objAdd5.AgeGroupRange = "45 To 64 Years";
            objAdd5.Browser = "IE";
            objAdd5.Device = "Android";
            objAdd5.Gender = "M";
            objAdd5.Region = "KS";
            objAdd5.Promo = "FB";
            objAdd5.PromoName = "Facebook";
            objAdd5.RegionName = "Kansas";
            objAdd5.URL = "Product.html&AgeGroup=" + objAdd5.AgeGroup + "&Gender=" + objAdd5.Gender + "&Region=" + objAdd5.Region + "&Device=" + objAdd5.Device + "&Browser=" + objAdd5.Browser;
            objAdd5.ImageURL = "images/16_Black.jpeg";

            result = obj.PostURL(objAdd5).ToString();
            Assert.Equal("OK", result);
        }
        [Fact]
        public void GetAdd()
        {              InitData.lstAdds = null;
            ValuesController obj = new ValuesController();
            InitData.intialize();
            Assert.NotNull(obj.getUrlNames());
        }
        [Fact]
        public void GetAddFail()
        {           
            ValuesController obj = new ValuesController();
            InitData.lstAdds = null;
            Assert.Null(obj.getUrlNames());
        }
        [Fact]
        public void getProducts()
        {           
            ValuesController obj = new ValuesController();
            InitData.lstProducts = null;
            Assert.Null(obj.GetProducts());
        }
        [Fact]
        public void getRegionAds()
        {
            InitData.lstProducts = null;
            ValuesController obj = new ValuesController();
            InitData.intialize();
            Assert.NotNull(obj.GetProductsDetails(1));
        }


    }
}
