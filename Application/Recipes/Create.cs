using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes {
    public class Create {
        public class Command : IRequest {
            public Guid Id { get; set; }

            public string Title { get; set; }

            public string Description { get; set; }

            public string Source { get; set; }

            public string Url { get; set; }

            public string Notes { get; set; }

            public string PrepTime { get; set; }

            public string CookTime { get; set; }

            public bool? IsPrivate { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command> {
            public CommandValidator () {
                RuleFor (x => x.Title).NotEmpty ();
                RuleFor (x => x.Description).NotEmpty ();
                RuleFor (x => x.Source).NotEmpty ();
                RuleFor (x => x.PrepTime).NotEmpty ();
                RuleFor (x => x.CookTime).NotEmpty ();
                RuleFor (x => x.IsPrivate).NotEmpty ();
            }
        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler (DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                var recipe = new Recipe {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Source = request.Source,
                    Url = request.Url,
                    Notes = request.Notes,
                    PrepTime = request.PrepTime,
                    CookTime = request.CookTime,
                    IsPrivate = (bool) request.IsPrivate
                };

                // Add recipe to recipes table
                _context.Recipes.Add (recipe);

                var user = await _context.Users.SingleOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());

                var follower = new UserRecipe {
                    AppUser = user,
                    Recipe = recipe,
                    IsCreator = true,
                    DateAdded = DateTime.Now
                };

                // Add follower to UserRecipe table
                _context.UserRecipes.Add (follower);

                var success = await _context.SaveChangesAsync () > 0;

                if (success) return Unit.Value;

                throw new Exception ("Problem saving changes");
            }
        }

    }
}