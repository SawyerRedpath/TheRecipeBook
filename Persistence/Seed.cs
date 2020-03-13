using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                    DisplayName = "Sawyer",
                    UserName = "sawyer",
                    Email = "sawyer@gmail.com"
                    },
                    new AppUser
                    {
                    DisplayName = "Tom",
                    UserName = "tom",
                    Email = "tom@gmail.com"
                    },
                    new AppUser
                    {
                    DisplayName = "Joe",
                    UserName = "joe",
                    Email = "joe@gmail.com"
                    }
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "P@ssw0rd");
                }

                if (!context.Recipes.Any())
                {
                    var recipes = new List<Recipe>
                    {
                        new Recipe
                        {
                        Title = "Recipe 1",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        Source = "Recipe Website",
                        Url = "Recipe link",
                        Notes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        PrepTime = "20 minutes",
                        CookTime = "30 minutes",
                        IsPrivate = true
                        },
                        new Recipe
                        {
                        Title = "Recipe 2",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        Source = "Recipe Website",
                        Url = "Recipe link",
                        Notes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        PrepTime = "20 minutes",
                        CookTime = "30 minutes",
                        IsPrivate = false
                        },
                        new Recipe
                        {
                        Title = "Recipe 3",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        Source = "Recipe Website",
                        Url = "Recipe link",
                        Notes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        PrepTime = "20 minutes",
                        CookTime = "30 minutes",
                        IsPrivate = false
                        },
                        new Recipe
                        {
                        Title = "Recipe 4",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        Source = "Recipe Website",
                        Url = "Recipe link",
                        Notes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        PrepTime = "20 minutes",
                        CookTime = "30 minutes",
                        IsPrivate = false
                        },
                        new Recipe
                        {
                        Title = "Recipe 5",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        Source = "Recipe Website",
                        Url = "Recipe link",
                        Notes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        PrepTime = "20 minutes",
                        CookTime = "30 minutes",
                        IsPrivate = true
                        }
                    };

                    context.Recipes.AddRange(recipes);
                    context.SaveChanges();
                }
            }
        }
    }
}