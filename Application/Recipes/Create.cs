using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Recipes
{
    public class Create
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

            public bool? IsPrivate { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Source).NotEmpty();
                RuleFor(x => x.PrepTime).NotEmpty();
                RuleFor(x => x.CookTime).NotEmpty();
                RuleFor(x => x.IsPrivate).NotEmpty();
            }
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
                var recipe = new Recipe
                {
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

                _context.Recipes.Add(recipe);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }

    }
}