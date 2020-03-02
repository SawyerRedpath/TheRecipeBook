using System;

namespace Domain {
    public class Recipe {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Source { get; set; }

        public string Url { get; set; }

        public string Notes { get; set; }
    }
}