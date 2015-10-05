using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiSample.Models;

namespace WebApiSample.InitializeData
{
    public class DataGenerator
    {
        public static int productKey = 0;

        public static List<Product> getProducts()
        {
            List<Product> lstProd = new List<Product>();

            Product lt = new Product();
            productKey = productKey + 1;
            lt.ID = productKey;
            lt.Make = "Apple";
            lt.Model = "I Phone 5";
            lt.Color = "Black";
            lt.Specs = "2 GB RAM";
            lt.ImgPath = "images/I6_Black.jpeg";
            lt.Price = "$200.0";
            lt.OfferPrice = "$190.0";
            lt.Views = 100;
            lt.Description = "Description";
            lt.TotalNoOfPurchases = 40;
            lt.Promo = "FB";
            //lt.PromoName =
            lstProd.Add(lt);

            Product lt1 = new Product();
            productKey = productKey + 1;
            lt1.ID = productKey;
            lt1.Make = "Apple";
            lt1.Model = "I Phone 5";
            lt1.Color = "White";
            lt1.Specs = "2 GB RAM";
            lt1.ImgPath = "images/I6_White.jpeg";
            lt1.Price = "$200.0";
            lt1.OfferPrice = "$190.0";
            lt1.Views = 120;
            lt1.TotalNoOfPurchases = 20;
            lt1.Description = "Description";
            lt1.Promo = "TW";
            lstProd.Add(lt1);

            Product lt2 = new Product();
            productKey = productKey + 1;
            lt2.ID = productKey;
            lt2.Make = "Apple";
            lt2.Model = "I Phone 5";
            lt2.Color = "Gold";
            lt2.Specs = "2 GB RAM";
            lt2.ImgPath = "images/I6_Gold.jpeg";
            lt2.Price = "$200.0";
            lt2.OfferPrice = "$190.0";
            lt2.Views = 80;
            lt2.TotalNoOfPurchases = 10;
            lt2.Promo = "YT";
            lt2.Description = "Details.";
            lstProd.Add(lt2);

            return lstProd;

        }


        public static List<CreateAdd> getActiveAdds()
        {
            List<CreateAdd> lstAdds = new List<CreateAdd>();
            CreateAdd objAdd = new CreateAdd();
            objAdd.ID = 1;
            objAdd.AgeGroup = "14T17";
            objAdd.AgeGroupRange = "14 To 17 Years";
            objAdd.Browser = "IE";
            objAdd.Device = "Android";
            objAdd.Gender = "M";
            objAdd.Region = "AL";
            objAdd.RegionName = "Alabama";
            objAdd.Promo = "FB";
            objAdd.PromoName = "Facebook";
            objAdd.URL = "http://cfsamplewithab.cfapps.io/" +  "Product.html&AgeGroup=" + objAdd.AgeGroup + "&Gender=" + objAdd.Gender + "&Region=" + objAdd.Region + "&Device=" + objAdd.Device + "&Browser=" + objAdd.Browser + "&Promo=" + objAdd.Promo;
            objAdd.ImageURL = "images/I6_Black.jpeg";
            objAdd.AddDesc = "iphone 6s Black";
            lstAdds.Add(objAdd);


            CreateAdd objAdd2 = new CreateAdd();
            objAdd2.ID = 2;
            objAdd2.AgeGroup = "25T44";
            objAdd2.AgeGroupRange = "25 To 44 Years";
            objAdd2.Browser = "IE";
            objAdd2.Device = "Android";
            objAdd2.Gender = "F";
            objAdd2.Region = "AR";
            objAdd2.Promo = "TW";
            objAdd2.PromoName = "Facebook";
            objAdd2.RegionName = "Arkansas";
            objAdd2.URL = "http://cfsamplewithab.cfapps.io/" + "Product.html&AgeGroup=" + objAdd2.AgeGroup + "&Gender=" + objAdd2.Gender + "&Region=" + objAdd2.Region + "&Device=" + objAdd2.Device + "&Browser=" + objAdd2.Browser + "&Promo=" + objAdd2.Promo;
            objAdd2.ImageURL = "images/I6_Gold.jpeg";
            objAdd2.AddDesc = "iphone 6s Gold";
            lstAdds.Add(objAdd2);


            CreateAdd objAdd3 = new CreateAdd();
            objAdd3.ID = 3;
            objAdd3.AgeGroup = "14T17";
            objAdd3.AgeGroupRange = "14 To 17 Years";
            objAdd3.Browser = "IE";
            objAdd3.Device = "Android";
            objAdd3.Gender = "M";
            objAdd3.Region = "CT";
            objAdd3.Promo = "FB";
            objAdd3.PromoName = "Facebook";
            objAdd3.RegionName = "Connecticut";
            objAdd3.URL = "http://cfsamplewithab.cfapps.io/" + "Product.html&AgeGroup=" + objAdd3.AgeGroup + "&Gender=" + objAdd3.Gender + "&Region=" + objAdd3.Region + "&Device=" + objAdd3.Device + "&Browser=" + objAdd3.Browser + "&Promo=" + objAdd3.Promo;
            objAdd3.ImageURL = "images/I6_White.jpeg";
            objAdd3.AddDesc = "iphone 6s White";
            lstAdds.Add(objAdd3);


            CreateAdd objAdd4 = new CreateAdd();
            objAdd4.ID = 4;
            objAdd4.AgeGroup = "25T44";
            objAdd4.AgeGroupRange = "25 To 44 Years";
            objAdd4.Browser = "IE";
            objAdd4.Device = "Android";
            objAdd4.Gender = "F";
            objAdd4.Region = "IN";
            objAdd4.Promo = "YT";
            objAdd4.PromoName = "Facebook";
            objAdd4.RegionName = "Indiana";
            objAdd4.URL = "http://cfsamplewithab.cfapps.io/" + "Product.html&AgeGroup=" + objAdd4.AgeGroup + "&Gender=" + objAdd4.Gender + "&Region=" + objAdd4.Region + "&Device=" + objAdd4.Device + "&Browser=" + objAdd4.Browser + "&Promo=" + objAdd4.Promo;
            objAdd4.ImageURL = "images/I6_Gold.jpeg";
            objAdd4.AddDesc = "iphone 6s Gold";
            lstAdds.Add(objAdd4);

            //CreateAdd objAdd5 = new CreateAdd();
            //objAdd5.ID = 5;
            //objAdd5.AgeGroup = "45T65";
            //objAdd5.AgeGroupRange = "45 To 64 Years";
            //objAdd5.Browser = "IE";
            //objAdd5.Device = "Android";
            //objAdd5.Gender = "M";
            //objAdd5.Region = "KS";
            //objAdd5.RegionName = "Kansas";
            //objAdd5.URL = "Product.html&AgeGroup=" + objAdd5.AgeGroup + "&Gender=" + objAdd5.Gender + "&Region=" + objAdd5.Region + "&Device=" + objAdd5.Device + "&Browser=" + objAdd5.Browser;
            //objAdd5.ImageURL = "images/I6_Black.jpeg";
            //objAdd5.AddDesc = "iphone 6s Black";
            //lstAdds.Add(objAdd5);
            return lstAdds;
        }

        public static List<AddsHistory> getAddsHistory()
        {
            List<AddsHistory> lstAdds = new List<AddsHistory>();
            /* California promos */
            AddsHistory objAdd = new AddsHistory();
            objAdd.Desc = "iPhone 6s";
            objAdd.AgeGroup = "below 5";
            objAdd.Gender = "M";
            objAdd.Region = "California";
            objAdd.ID = 1;
            objAdd.Views = 20;
            lstAdds.Add(objAdd);

            AddsHistory objAddCal1 = new AddsHistory();
            objAddCal1.Desc = "Samsung s6";
            objAddCal1.AgeGroup = "below 5";
            objAddCal1.Gender = "M";
            objAddCal1.Region = "California";
            objAddCal1.ID = 1;
            objAddCal1.Views = 45;
            lstAdds.Add(objAddCal1);

            AddsHistory objAddCal2 = new AddsHistory();
            objAddCal2.Desc = "Nexus 5";
            objAddCal2.AgeGroup = "below 5";
            objAddCal2.Gender = "M";
            objAddCal2.Region = "California";
            objAddCal2.ID = 1;
            objAddCal2.Views = 65;
            lstAdds.Add(objAddCal2);
            /* California promo ends*/

            AddsHistory objAdd1 = new AddsHistory();
            objAdd1.Desc = "Nexus 6";
            objAdd1.AgeGroup = "10 to 15";
            objAdd1.Gender = "F";
            objAdd1.Region = "New York";
            objAdd1.ID = 2;
            objAdd1.Views = 33;
            lstAdds.Add(objAdd1);
            return lstAdds;
        }


    }
}
