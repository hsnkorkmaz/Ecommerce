﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(int id);
        JwtSecurityToken ValidateToken(string jwt);
    }
}
