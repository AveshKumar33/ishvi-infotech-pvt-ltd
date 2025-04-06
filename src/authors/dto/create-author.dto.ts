export class CreateAuthorDto {
    readonly name: string;
    readonly bio?: string;
    readonly profile_picture?: string;
    readonly email?: string;
    readonly mobile?: string;
    readonly contents?: string[];
}