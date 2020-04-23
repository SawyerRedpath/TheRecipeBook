using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Recipes;
using Application.Recipes.List;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RecipesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<RecipeDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<RecipeDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsRecipeCreator")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsRecipeCreator")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPost("{id}/follow")]
        public async Task<ActionResult<Unit>> Follow(Guid id)
        {
            return await Mediator.Send(new Follow.Command { Id = id });
        }

        [HttpDelete("{id}/follow")]
        public async Task<ActionResult<Unit>> Unfollow(Guid id)
        {
            return await Mediator.Send(new Unfollow.Command { Id = id });
        }
    }
}