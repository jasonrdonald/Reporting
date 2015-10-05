using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiSample.Models
{
    public class RegionMap
    {
        public string AdId { get; set; }
        public string region { get; set; }
        public int hits { get; set; }

    }

    public class AgeGrouping
    {
        public string Region { get; set; }
        public int Under_5_Years  { get; set; }
        public int _5_to_13Years { get; set; }
        public int _14_to_17_Years { get; set; }
        public int _18_to_24_Years { get; set; }
        public int _25_to_44_Years { get; set; }
        public int _45_to_64_Years { get; set; }
        public int _65_Years_and_Over { get; set; }

    }

    public class Spline
    {
        public List<AddsHistory> AdsHistoryList { get; set; }

        public string ID { get; set; }

        public int Hits { get; set; }

        public List<List<object>> columns { get; set; }
    }
}
