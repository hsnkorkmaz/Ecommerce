using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Entities;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _repository;

        public AuthController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(UserRegisterDto dto)
        {
            var user = new User()
            {
                Name = "",
                Surname = "",
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Address = "",
                Role = "user"
            };

            return Created("success", await _repository.Create(user));
        }


        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLoginDto dto)
        {
            var user = await _repository.GetByEmail(dto.Email);

            if (user == null)
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }
            
            return Ok(user);
        }

    }
}
