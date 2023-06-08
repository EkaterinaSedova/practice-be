export class CreateCommentDto {
    readonly user_id: number;
    readonly post_id: number;
    readonly content: string;
}