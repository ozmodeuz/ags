{
  description = "Oz's Shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    #nixpkgs.url = "github:nixos/nixpkgs?ref=staging";
    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    { self, nixpkgs, ags, astal }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
      };
    in
    {
      packages.${system} = {
        default = ags.lib.bundle {
          inherit pkgs;
          src = ./.;
          name = "oz-shell";
          entry = "app.ts";
          extraPackages = [
            ags.packages.${system}.default
            astal.packages.${system}.default
            astal.packages.${system}.apps
            astal.packages.${system}.network
            astal.packages.${system}.wireplumber
          ];
        };
      };

      devShells.${system} = {
        default = pkgs.mkShell {
          buildInputs = [
            ags.packages.${system}.default
            astal.packages.${system}.default
            astal.packages.${system}.apps
            astal.packages.${system}.network
            astal.packages.${system}.wireplumber
          ];
        };
      };
    };
}
