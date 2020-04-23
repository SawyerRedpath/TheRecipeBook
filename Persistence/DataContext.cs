using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence {
    public class DataContext : IdentityDbContext<AppUser> {
        public DataContext (DbContextOptions options) : base (options) {

        }

        public DbSet<Value> Values { get; set; }

        public DbSet<Recipe> Recipes { get; set; }

        public DbSet<UserRecipe> UserRecipes { get; set; }

        protected override void OnModelCreating (ModelBuilder builder) {
            base.OnModelCreating (builder);

            builder.Entity<UserRecipe> (x => x.HasKey (ua => new { ua.AppUserId, ua.RecipeId }));

            builder.Entity<UserRecipe> ()
                .HasOne (u => u.AppUser)
                .WithMany (r => r.UserRecipes)
                .HasForeignKey (u => u.AppUserId);

            builder.Entity<UserRecipe> ()
                .HasOne (r => r.Recipe)
                .WithMany (u => u.UserRecipes)
                .HasForeignKey (r => r.RecipeId);
        }

    }
}