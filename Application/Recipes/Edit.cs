using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Recipes
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public string Title { get; set; }

            public string Description { get; set; }

            public string Source { get; set; }

            public string Url { get; set; }

            public string Notes { get; set; }

            public string PrepTime { get; set; }

            public string CookTime { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var recipe = await _context.Recipes.FindAsync(request.Id);

                if (recipe == null) throw new Exception("Could not find recipe");

                recipe.Title = request.Title ?? recipe.Title;
                recipe.Description = request.Description ?? recipe.Description;
                recipe.Source = request.Source ?? recipe.Source;
                recipe.Url = request.Url ?? recipe.Url;
                recipe.Notes = request.Notes ?? recipe.Notes;
                recipe.PrepTime = request.PrepTime ?? recipe.PrepTime;
                recipe.PrepTime = request.PrepTime ?? recipe.CookTime;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}