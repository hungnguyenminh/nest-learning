# Tạo module bao gồm cả dto, entities, controller, module, service
nest g resource <module-name>

# Trong 1 module có 3 phần
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: []
})

imports : 
    + Là nơi bạn khai báo các module khác mà module hiện tại phụ thuộc. 
    + Nếu bạn muốn sử dụng các service, repository, hay entity từ module khác, bạn cần import module đó vào đây.

    Service: Các lớp chứa logic nghiệp vụ. Ví dụ: UsersService, OrdersService, TransactionPointsService.

    Repository: Các lớp quản lý truy vấn dữ liệu (thường khi dùng với TypeORM). Ví dụ: UsersRepository, OrdersRepository, AdminsRepository.

    Guard: Được sử dụng để kiểm soát quyền truy cập vào các route, đảm bảo người dùng có quyền phù hợp. Ví dụ: AdminGuard, JwtAuthGuard.

    Helper/Utility Classes: Các lớp giúp xử lý các công việc nhỏ, chẳng hạn như ResponseHelper, NotificationHelper.

    VD: 
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({...}),
        MulterModule.register({...}),
        NotificationsModule,
        SendNotificationModule,
    ]

providers:
    + Dùng để import các service, repository, guard, helper, hoặc các factory function.

controllers: 
    + Dùng để import controller



Câu hỏi chưa được giải đáp:
1. Khi nào thì import vào phần imports của module
2. Khi nào thì import vào phần providers của module