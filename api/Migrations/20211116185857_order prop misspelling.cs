using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class orderpropmisspelling : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDelievered",
                table: "Orders",
                newName: "IsDelivered");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDelivered",
                table: "Orders",
                newName: "IsDelievered");
        }
    }
}
